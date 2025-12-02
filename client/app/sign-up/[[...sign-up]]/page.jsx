import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">
                        Welcome to ThinkSpace
                    </h1>
                    <p className="text-slate-600">Create your account to get started</p>
                </div>

                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "glass-panel shadow-xl",
                        }
                    }}
                />
            </div>
        </div>
    );
}
