'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Load user on mount if token exists. Keep an initializing flag to avoid
    // redirecting to /login before loadUser starts and sets loading state.
    let mounted = true;
    const token = localStorage.getItem('access_token');

    if (token && !isAuthenticated) {
      // start loading and mark initialized when finished
      loadUser()
        .catch(() => {
          /* ignore - loadUser will clear token if invalid */
        })
        .finally(() => {
          if (mounted) setInitializing(false);
        });
    } else {
      // no token or already authenticated
      setInitializing(false);
      if (!token && !isAuthenticated) {
        // Push to login after initialization to avoid flash
        router.push('/login');
      }
    }

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, loadUser, router]);

  useEffect(() => {
    // After initialization and loading, redirect to login if not authenticated
    if (!initializing && !isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, initializing, router]);

  // Show loading spinner while checking authentication
  if (initializing || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Render children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
