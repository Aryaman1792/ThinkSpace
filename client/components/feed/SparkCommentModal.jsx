"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";

const SparkCommentModal = ({ spark, isOpen, onClose, onCommentSubmit }) => {
    const [comment, setComment] = useState("");

    if (!isOpen || !spark) return null;

    const handleSubmit = () => {
        if (!comment.trim()) return;
        onCommentSubmit(spark._id);
        setComment("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Add a Thought</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Spark Preview */}
                <div className="p-4 bg-slate-50/50">
                    <div className="flex gap-3">
                        <img
                            src={spark.user.avatar}
                            alt={spark.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-bold text-slate-900 text-sm">{spark.user.name}</p>
                            <p className="text-slate-600 text-sm mt-1 line-clamp-2">{spark.content}</p>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4">
                    <div className="relative">
                        <textarea
                            placeholder="Share your thoughts..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full h-32 p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-100 resize-none placeholder:text-slate-400 text-slate-700"
                            autoFocus
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={!comment.trim()}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Post Thought</span>
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SparkCommentModal;
