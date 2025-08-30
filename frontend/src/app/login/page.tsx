import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-3">
        <input placeholder="Email" className="input" />
        <input placeholder="Password" type="password" className="input" />
        <div className="flex items-center justify-between">
          <button className="btn-primary">Sign in</button>
          <Link href="/">Back</Link>
        </div>
      </form>
    </section>
  );
}
