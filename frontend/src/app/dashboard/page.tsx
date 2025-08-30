'use client';

import { useAuthStore } from '../../store/authStore';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';

// Helper to safely parse createdAt values (string | number | Date | undefined)
function formatMemberSince(value: unknown) {
  if (!value) return null;
  let d: Date | null = null;
  if (value instanceof Date) d = value;
  else if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value as string);
    if (!isNaN(parsed.getTime())) d = parsed;
  }

  return d ? d.toLocaleDateString() : null;
}

export default function DashboardPage() {
  const { user, updatePreferences } = useAuthStore();

  const handleThemeChange = async (theme: string) => {
    try {
      await updatePreferences({ selectedTheme: theme });
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Profile Information
                </h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">User ID:</span> {user?.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Selected Theme:</span> {user?.selectedTheme || 'Default'}
                  </p>
                  {user?.createdAt && (
                    <p className="text-sm">
                      <span className="font-medium">Member since:</span>{' '}
                      {formatMemberSince(user.createdAt) ?? '—'}
                    </p>
                  )}
                </div>
              </div>

              {/* Theme Settings */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Theme Settings
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">
                    Choose your preferred theme:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['light', 'dark', 'retro', 'clean'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handleThemeChange(theme)}
                        className={`px-3 py-2 text-sm rounded-md border ${
                          user?.selectedTheme === theme
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                New Diary Entry
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                Upload Media
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                Search Entries
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="text-center py-8 text-gray-500">
              <p>No diary entries yet. Start by creating your first entry!</p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
