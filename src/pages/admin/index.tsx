import { endpoints } from '@/config/endpoints';
import { useSessionStorage } from '@/hooks/use-session-storage.hook';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminLogin = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
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
      <p className="text-white">Welcome to Admin</p>
      <input
        className="w-full h-10 rounded bg-transparent border text-white px-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="py-2 px-4 rounded w-full bg-blue-700 mt-4 hover:bg-blue-600 transition-colors text-white"
        onClick={handleCreate}
      >
        Create room
      </button>
    </div>
  );
};

export default AdminLogin;
