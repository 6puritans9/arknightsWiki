import Link from "next/link";

export default function AuthErrorPage() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
            <p>There was an issue with the authentication process.</p>
            <p className="mt-4">
                Please try again or contact support if the problem persists.
            </p>
            <Link
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Return to Home
            </Link>
        </div>
    );
}
