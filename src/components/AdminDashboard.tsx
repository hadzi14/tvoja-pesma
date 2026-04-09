import { useState } from 'react';
import { 
  Users, Music, DollarSign, Activity, 
  Play, Download, Trash2, Search, 
  ArrowUp, AlertCircle, CheckCircle, Clock,
  Eye, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - u pravoj app bi dolazilo iz API-a
  const stats = {
    totalSongs: 1247,
    totalRevenue: 5128.50,
    thisMonthSongs: 187,
    thisMonthRevenue: 753.90,
    conversionRate: 12.5,
    avgOrderValue: 4.12,
    popularOccasion: 'rođendan',
    popularStyle: 'pop balada'
  };

  const songs = [
    {
      id: '1',
      recipientName: 'Marija Petrović',
      occasion: 'rođendan',
      musicStyle: 'pop balada',
      package: 'pro',
      price: 7.99,
      status: 'completed',
      createdAt: '2024-01-15 14:32',
      userEmail: 'marko@example.com',
      duration: 184
    },
    {
      id: '2',
      recipientName: 'Nikola Jovanović',
      occasion: 'izvinjenje',
      musicStyle: 'sevdalinka',
      package: 'basic',
      price: 4.99,
      status: 'completed',
      createdAt: '2024-01-15 13:15',
      userEmail: 'ana@example.com',
      duration: 142
    },
    {
      id: '3',
      recipientName: 'Majka Dragana',
      occasion: 'majčin dan',
      musicStyle: 'sevdalinka',
      package: 'premium',
      price: 9.99,
      status: 'completed',
      createdAt: '2024-01-15 12:45',
      userEmail: 'ivan@example.com',
      duration: 238
    },
    {
      id: '4',
      recipientName: 'Petar Stojanović',
      occasion: 'rođendan',
      musicStyle: 'humoristična',
      package: 'pro',
      price: 7.99,
      status: 'generating',
      createdAt: '2024-01-15 11:30',
      userEmail: 'milos@example.com',
      duration: 0
    },
    {
      id: '5',
      recipientName: 'Sara Marković',
      occasion: 'godišnjica',
      musicStyle: 'turbo-folk',
      package: 'premium',
      price: 9.99,
      status: 'failed',
      createdAt: '2024-01-15 10:15',
      userEmail: 'stefan@example.com',
      duration: 0
    }
  ];

  const users = [
    {
      id: '1',
      email: 'marko@example.com',
      name: 'Marko Petrović',
      totalPurchases: 5,
      totalSpent: 39.95,
      lastPurchase: '2024-01-15',
      createdAt: '2023-11-20'
    },
    {
      id: '2',
      email: 'ana@example.com',
      name: 'Ana Jovanović',
      totalPurchases: 3,
      totalSpent: 19.97,
      lastPurchase: '2024-01-15',
      createdAt: '2023-12-05'
    },
    {
      id: '3',
      email: 'ivan@example.com',
      name: 'Ivan Stojanović',
      totalPurchases: 1,
      totalSpent: 9.99,
      lastPurchase: '2024-01-15',
      createdAt: '2024-01-10'
    }
  ];

  const financials = {
    todayRevenue: 87.97,
    weekRevenue: 453.90,
    monthRevenue: 753.90,
    paddleFees: 256.42,
    aiCosts: 623.50,
    netProfit: 4248.58,
    pendingRefunds: 24.97,
    profitMargin: 82.9
  };

  const songsByOccasion = [
    { occasion: 'rođendan', count: 567, percentage: 45.4, icon: '🎂' },
    { occasion: 'ljubavna poruka', count: 234, percentage: 18.8, icon: '❤️' },
    { occasion: 'izvinjenje', count: 187, percentage: 15.0, icon: '😢' },
    { occasion: 'godišnnica', count: 124, percentage: 9.9, icon: '💍' },
    { occasion: 'majčin/očev dan', count: 78, percentage: 6.3, icon: '👵' },
    { occasion: 'šaljiva pesma', count: 57, percentage: 4.6, icon: '😂' }
  ];

  const songsByStyle = [
    { style: 'pop balada', count: 423 },
    { style: 'sevdalinka', count: 287 },
    { style: 'turbo-folk', count: 198 },
    { style: 'rock', count: 156 },
    { style: 'hip-hop/rap', count: 98 },
    { style: 'narodna', count: 85 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Završeno
          </span>
        );
      case 'generating':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Generiše se
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            Greška
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {status}
          </span>
        );
    }
  };

  const getPackageBadge = (pkg: string) => {
    const styles = {
      basic: 'bg-gray-100 text-gray-700',
      pro: 'bg-rose-100 text-rose-700',
      premium: 'bg-purple-100 text-purple-700'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${styles[pkg as keyof typeof styles]}`}>
        {pkg}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Music className="w-8 h-8 text-rose-500" />
                PESMA ZA TEBE
              </h1>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Osveži
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-rose-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ukupno pesama</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalSongs}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +{stats.thisMonthSongs} ovog meseca
                  </p>
                </div>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ukupan prihod</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    €{stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +€{stats.thisMonthRevenue} ovog meseca
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Prosečna porudžbina</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    €{stats.avgOrderValue.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">po pesmi</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Konverzija</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {stats.conversionRate}%
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +2.3% od prošlog meseca
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {['overview', 'songs', 'users', 'financials', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Songs */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Music className="w-5 h-5 text-rose-500" />
                    Nedavne pesme
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {songs.slice(0, 4).map((song) => (
                    <div key={song.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {song.recipientName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {song.occasion} • {song.musicStyle}
                          </p>
                        </div>
                        {getPackageBadge(song.package)}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">{song.createdAt}</span>
                        {getStatusBadge(song.status)}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-center text-rose-600 font-medium hover:bg-rose-50 transition-colors rounded-b-xl">
                  Vidi sve pesme →
                </button>
              </div>

              {/* Popular Occasions */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">Popularne prilike</h3>
                </div>
                <div className="p-4 space-y-3">
                  {songsByOccasion.map((item) => (
                    <div key={item.occasion}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-2 text-gray-700">
                          <span>{item.icon}</span>
                          <span className="capitalize font-medium">{item.occasion}</span>
                        </span>
                        <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Financial Summary */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Finansijski pregled</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-green-700">Ovog meseca</p>
                    <p className="text-2xl font-bold text-green-800">
                      €{financials.monthRevenue.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-red-700">AI troškovi</p>
                    <p className="text-2xl font-bold text-red-800">
                      €{financials.aiCosts.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profit marža</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {financials.profitMargin}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-green-700">Net profit</p>
                    <p className="text-2xl font-bold text-green-800">
                      €{financials.netProfit.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Users */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-500" />
                    Novi korisnici
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {users.slice(0, 3).map((user) => (
                    <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-gray-600">{user.totalPurchases} kupovina</span>
                        <span className="text-gray-600">€{user.totalSpent.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Songs Tab */}
          {activeTab === 'songs' && (
            <div className="bg-white rounded-xl shadow-sm">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-lg font-semibold text-gray-800">Sve pesme</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Pretraga..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
                      />
                    </div>
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-500 outline-none"
                    >
                      <option value="all">Svi statusi</option>
                      <option value="completed">Završeno</option>
                      <option value="generating">Generiše se</option>
                      <option value="failed">Greška</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Pesma za</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Prilika</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Stil</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Paket</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Cena</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Kreirano</th>
                      <th className="text-left p-4 font-medium text-gray-600 text-sm">Akcije</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {songs.map((song) => (
                      <tr key={song.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-gray-800">{song.recipientName}</p>
                            <p className="text-xs text-gray-500">{song.userEmail}</p>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 capitalize">{song.occasion}</td>
                        <td className="p-4 text-gray-600 capitalize">{song.musicStyle}</td>
                        <td className="p-4">{getPackageBadge(song.package)}</td>
                        <td className="p-4 font-semibold text-gray-800">€{song.price.toFixed(2)}</td>
                        <td className="p-4">{getStatusBadge(song.status)}</td>
                        <td className="p-4 text-sm text-gray-500">{song.createdAt}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {song.status === 'completed' && (
                              <>
                                <button className="p-2 hover:bg-rose-100 rounded-lg text-rose-600 transition-colors" title="Slušaj">
                                  <Play className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-amber-100 rounded-lg text-amber-600 transition-colors" title="Preuzmi">
                                  <Download className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Detalji">
                                  <Eye className="w-4 h-4" />
                                </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors" title="Obriši">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Korisnici</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600 text-sm">Ime</th>
                    <th className="text-left p-4 font-medium text-gray-600 text-sm">Email</th>
                    <th className="text-left p-4 font-medium text-gray-600 text-sm">Kupovine</th>
                    <th className="text-left p-4 font-medium text-gray-600 text-sm">Potrošeno</th>
                    <th className="text-left p-4 font-medium text-gray-600 text-sm">Poslednja</th>
                    <th className="text-left p-4 font-medium text-gray-600 text-sm">Član od</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4 text-gray-800 font-semibold">{user.totalPurchases}</td>
                      <td className="p-4 text-gray-800 font-semibold">€{user.totalSpent.toFixed(2)}</td>
                      <td className="p-4 text-sm text-gray-500">{user.lastPurchase}</td>
                      <td className="p-4 text-sm text-gray-500">{user.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Financials Tab */}
          {activeTab === 'financials' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Finansijski pregled</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-sm text-green-700">Današnji prihod</p>
                      <p className="text-2xl font-bold text-green-800">€{financials.todayRevenue.toFixed(2)}</p>
                    </div>
                    <ArrowUp className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-sm text-blue-700">Ove nedelje</p>
                      <p className="text-2xl font-bold text-blue-800">€{financials.weekRevenue.toFixed(2)}</p>
                    </div>
                    <ArrowUp className="w-8 h-8 text-blue-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl">
                    <div>
                      <p className="text-sm text-rose-700">Ovog meseca</p>
                      <p className="text-2xl font-bold text-rose-800">€{financials.monthRevenue.toFixed(2)}</p>
                    </div>
                    <ArrowUp className="w-8 h-8 text-rose-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Troškovi i profit</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-600">Paddle provizije (~5%)</p>
                      <p className="text-xl font-bold text-gray-800">€{financials.paddleFees.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                    <div>
                      <p className="text-sm text-red-600">AI troškovi</p>
                      <p className="text-xl font-bold text-red-800">€{financials.aiCosts.toFixed(2)}</p>
                    </div>
                    <span className="text-xs text-gray-500">~€0.50/pesma</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                    <div>
                      <p className="text-sm text-amber-600">Pending refunds</p>
                      <p className="text-xl font-bold text-amber-800">€{financials.pendingRefunds.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-green-100 text-sm">Ukupan prihod</p>
                    <p className="text-3xl font-bold mt-1">€{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">Ukupni troškovi</p>
                    <p className="text-3xl font-bold mt-1">€{(financials.paddleFees + financials.aiCosts).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm">NET PROFIT</p>
                    <p className="text-4xl font-bold mt-1 text-green-200">€{financials.netProfit.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-green-400/30">
                  <p className="text-green-100">Profit marža: <span className="font-bold text-white text-xl">{financials.profitMargin}%</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Muzički stilovi</h3>
                <div className="space-y-4">
                  {songsByStyle.map((item, index) => (
                    <div key={item.style}>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 capitalize">{item.style}</span>
                        <span className="text-gray-500">{item.count}</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            index === 0 ? 'bg-rose-500' : 
                            index === 1 ? 'bg-amber-500' :
                            index === 2 ? 'bg-green-500' :
                            index === 3 ? 'bg-blue-500' :
                            index === 4 ? 'bg-purple-500' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${(item.count / songsByStyle[0].count) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Popularnost paketa</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
                        Basic (€4.99)
                      </span>
                      <span className="text-gray-500 font-medium">45%</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                        Pro (€7.99)
                      </span>
                      <span className="text-gray-500 font-medium">40%</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                        Premium (€9.99)
                      </span>
                      <span className="text-gray-500 font-medium">15%</span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-sm text-amber-800">
                    💡 <strong>Savet:</strong> Nudi 20% popust na Pro paket za one koji kupe Basic, povećaj konverziju!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}