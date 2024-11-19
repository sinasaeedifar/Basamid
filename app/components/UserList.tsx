// components/UserList.tsx
'use client';


import {useUsers} from "@/app/hooks/useUsers";

export default function UserList() {
    const { data, isLoading, error } = useUsers();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data?.map((user) => (
                <li key={user.id}>
                    {user.name} - {user.email}
                </li>
            ))}
        </ul>
    );
}
