import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AuthButtons: React.FC = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Loading authentication status...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Firebase Authentication</CardTitle>
        <CardDescription>
          {user ? 'You are currently signed in' : 'Please sign in to continue'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.displayName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Sign in with your Google account to access all features.</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {user ? (
          <Button variant="destructive" onClick={signOut}>Sign Out</Button>
        ) : (
          <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthButtons;