'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserContext, UserType } from '@/global/userContext';
import React from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userContext = React.useContext(UserContext);
  const router = useRouter();

  const handleSubmit = () => {
    fetch('http://localhost:3001/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const userData: UserType = {
            userId: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
            address: data.address,
            contact: data.contact,
            photoGraphUri: data.photoGraphUri,
            createdAt: data.createdAt,
          };

          userContext.setUser(userData);
          router.push('/dashboard');
        });
      } else if (res.status == 404) {
        res.json().then((data) => {
          alert(data.message);
          return;
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Enter Credentials</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Log in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
