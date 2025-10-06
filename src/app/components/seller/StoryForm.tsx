'use client'

import { User } from "@/types/user";
import { useState } from "react";

type Props = {
    user: User;
    onSave: (updatedStory: string) => void;
};

export default function StoryForm({ user, onSave }: Props) {
    const [story, setStory] = useState(user.story || "");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (story.trim() === "") {
            setError("Story cannot be empty.");
            return;
        }
        setIsSaving(true);
        setError("");
        try {
            await onSave(story);
            setIsEditing(false);
        } catch (err) {
            setError("Failed to save story. Please try again.");
        }
        setIsSaving(false);
    };

    return (
    <div className="max-w-3xl mx-auto p-4 bg-white/15 backdrop-blur-[15px] rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Your Story</h2>
        {isEditing ? (
        <div className="flex flex-col">
            <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded mb-2 resize-none"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            disabled={isSaving}
            placeholder="Share your story..."
        />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex space-x-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:opacity-50"
                    onClick={() => { setIsEditing(false); setStory(user.story || ""); setError(""); }}
                    disabled={isSaving}
                >
                    Cancel
                </button>
            </div>
        </div>
        ) : (
        <div>   
            <p className="whitespace-pre-wrap mb-4">{user.story || "You haven't shared your story yet."}</p>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => setIsEditing(true)}
            >
                {user.story ? "Edit Story" : "Add Your Story"}
            </button>
        </div>
        )}
    </div>
    );
}

