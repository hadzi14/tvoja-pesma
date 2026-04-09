// Database client (Supabase or Vercel Postgres)
// Choose one based on your preference

import { createClient } from '@supabase/supabase-js';

// Supabase approach (recommended for full-featured app)
const supabaseUrl = (globalThis as any).VITE_SUPABASE_URL || '';
const supabaseAnonKey = (globalThis as any).VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database interfaces based on our schema
export interface Song {
  id: string;
  user_email: string | null;
  recipient_name: string;
  recipient_email: string | null;
  occasion: string;
  relationship?: string;
  music_style: string;
  voice_type?: string;
  tempo?: string;
  instruments?: string[];
  lyrics_text: string;
  prompt_used: string;
  audio_url: string;
  cover_art_url?: string;
  pdf_url?: string;
  video_url?: string | null;
  lyrics_video_url?: string | null;
  duration: number;
  package: 'basic' | 'pro' | 'premium';
  price: number;
  has_dedication: boolean;
  dedication_text?: string;
  ai_generate_lyrics: boolean;
  ai_cost: number;
  status: 'generating' | 'completed' | 'failed';
  error_message?: string | null;
  generated_at: Date | null;
  paddle_transaction_id: string | null;
  add_ons?: string[];
  metadata?: Record<string, any>;
  created_at: Date;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: Date;
  total_songs?: number;
  total_spent?: number;
  first_purchase_at?: Date | null;
}

export interface Purchase {
  id: string;
  song_id: string;
  user_email: string;
  amount: number;
  currency: string;
  paddle_transaction_id: string;
  paddle_checkout_id: string;
  status: 'pending' | 'completed' | 'refunded';
  refunded_at?: Date | null;
  purchased_at: Date;
}

export interface SongAnalytics {
  total_songs: number;
  songs_this_week: number;
  songs_this_month: number;
  total_revenue: number;
  revenue_this_month: number;
  popular_occasions: Array<{ occasion: string; count: number }>;
  popular_styles: Array<{ style: string; count: number }>;
  package_distribution: Array<{ package: string; count: number }>;
}

// Helper functions for database operations
export async function createSong(songData: Partial<Song>): Promise<Song> {
  const { data, error } = await supabase
    .from('songs')
    .insert({
      ...songData,
      status: 'generating',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create song: ${error.message}`);
  }

  return data;
}

export async function updateSong(id: string, updates: Partial<Song>): Promise<Song> {
  const { data, error } = await supabase
    .from('songs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update song: ${error.message}`);
  }

  return data;
}

export async function getSong(songId: string): Promise<Song | null> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', songId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getSongsByEmail(email: string): Promise<Song[]> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_email', email)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to get songs: ${error.message}`);
  }

  return data || [];
}

export async function getAllSongs(limit = 50): Promise<Song[]> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to get all songs: ${error.message}`);
  }

  return data || [];
}

export async function createPurchase(purchaseData: Partial<Purchase>): Promise<Purchase> {
  const { data, error } = await supabase
    .from('purchases')
    .insert({
      ...purchaseData,
      purchased_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create purchase: ${error.message}`);
  }

  return data;
}

export async function getSongAnalytics(): Promise<SongAnalytics> {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Get total songs
  const { count: totalSongs } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true });

  // Get songs this week
  const { count: songsThisWeek } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo.toISOString());

  // Get songs this month
  const { count: songsThisMonth } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneMonthAgo.toISOString());

  // Get total revenue
  const { data: revenueData } = await supabase
    .from('purchases')
    .select('amount')
    .eq('status', 'completed');

  // Get revenue this month
  const { data: revenueMonthData } = await supabase
    .from('purchases')
    .select('amount')
    .eq('status', 'completed')
    .gte('purchased_at', oneMonthAgo.toISOString());

  // Get popular occasions
  const { data: occasionData } = await supabase
    .from('songs')
    .select('occasion')
    .gte('created_at', oneMonthAgo.toISOString());

  const popularOccasions = occasionData?.reduce((acc: Record<string, number>, song) => {
    acc[song.occasion] = (acc[song.occasion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Get popular styles
  const { data: styleData } = await supabase
    .from('songs')
    .select('music_style')
    .gte('created_at', oneMonthAgo.toISOString());

  const popularStyles = styleData?.reduce((acc: Record<string, number>, song) => {
    acc[song.music_style] = (acc[song.music_style] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Get package distribution
  const { data: packageData } = await supabase
    .from('songs')
    .select('package')
    .gte('created_at', oneMonthAgo.toISOString());

  const packageDistribution = packageData?.reduce((acc: Record<string, number>, song) => {
    acc[song.package] = (acc[song.package] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return {
    total_songs: totalSongs || 0,
    songs_this_week: songsThisWeek || 0,
    songs_this_month: songsThisMonth || 0,
    total_revenue: revenueData?.reduce((sum: number, p) => sum + p.amount, 0) || 0,
    revenue_this_month: revenueMonthData?.reduce((sum: number, p) => sum + p.amount, 0) || 0,
    popular_occasions: Object.entries(popularOccasions).map(([occasion, count]) => ({ occasion, count: count as number })),
    popular_styles: Object.entries(popularStyles).map(([style, count]) => ({ style, count: count as number })),
    package_distribution: Object.entries(packageDistribution).map(([pkg, count]) => ({ package: pkg, count: count as number })),
  };
}