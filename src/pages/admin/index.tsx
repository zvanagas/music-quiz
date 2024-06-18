import { endpoints } from '@/config/endpoints';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminLogin = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [_, setUser] = useSessionStorage('user');

  const handleCreate = async () => {
    try {
      const { id } = await fetch(endpoints.rooms, {
        method: 'POST',
        body: JSON.stringify({ name }),
      }).then((response) => response.json());

      setUser(name);
      router.push(`/admin/rooms/${id}`);
    } catch {
      //
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p>Welcome to Admin</p>
      <Input
        borderColor="white"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="py-2 px-4 rounded w-full bg-blue-700 mt-4"
        onClick={handleCreate}
      >
        Create room
      </button>
    </div>
  );
};

export default AdminLogin;
