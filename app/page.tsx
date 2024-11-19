// app/page.tsx
import UserList from '../app/components/UserList';
import QueryProvider from "@/app/components/QueryProvider/QueryProvider";

export default function HomePage() {
  return (
      <QueryProvider>
        <main>
          <h1 className="text-center text-2xl">به اپلیکیشن نوبت‌دهی خوش آمدید</h1>
          <UserList />
        </main>
      </QueryProvider>
  );
}
