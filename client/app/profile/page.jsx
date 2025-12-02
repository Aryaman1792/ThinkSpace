import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import MainLayout from "@/components/layout/MainLayout";
import ProfileContent from "@/components/profile/ProfileContent";

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

    // Serialize user data to pass to client component
    const userData = {
        fullName: user.fullName,
        username: user.username,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
    };

    return <ProfileContent user={userData} />;
}
