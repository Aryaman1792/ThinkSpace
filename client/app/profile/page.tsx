import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import GlassCard from "@/components/ui/GlassCard";
import { currentUser } from "@clerk/nextjs/server";
import { Zap, Users, UserPlus } from "lucide-react";

export default async function Profile() {
    const user = await currentUser();

    if (!user) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-slate-500">Please sign in to view your profile.</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-20 shadow-lg shadow-indigo-100">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400" />
                <img
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80"
                    alt="Cover"
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                />

                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                    <div className="p-2 bg-white/30 backdrop-blur-xl rounded-full">
                        <img
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                        />
                    </div>
                </div>
            </div>

            <div className="md:pl-48 mb-8 text-center md:text-left">
                <h1 className="text-3xl font-bold text-slate-800">{user.fullName}</h1>
                <p className="text-slate-500 font-medium">@{user.username || user.firstName?.toLowerCase()}</p>
                <p className="text-slate-600 mt-2 max-w-md mx-auto md:mx-0">
                    Digital explorer & creator. Loving the anti-gravity vibes! ☁️✨
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <StatBox icon={Zap} label="Sparks" value="12.5k" color="text-yellow-500" bg="bg-yellow-50" />
                <StatBox icon={Users} label="Followers" value="8,234" color="text-blue-500" bg="bg-blue-50" />
                <StatBox icon={UserPlus} label="Following" value="456" color="text-green-500" bg="bg-green-50" />
            </div>

            <div className="border-t border-indigo-100 pt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
                <div className="text-center py-12 text-slate-400">
                    No recent activity to show.
                </div>
            </div>
        </MainLayout>
    );
}

const StatBox = ({ icon: Icon, label, value, color, bg }: any) => (
    <GlassCard className="flex flex-col items-center justify-center p-6 gap-2 hover:scale-105 transition-transform duration-300">
        <div className={`p-3 rounded-full ${bg} ${color} mb-1`}>
            <Icon size={24} />
        </div>
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-sm text-slate-500 font-medium">{label}</span>
    </GlassCard>
);
