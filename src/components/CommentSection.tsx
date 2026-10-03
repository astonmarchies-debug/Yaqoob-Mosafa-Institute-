import React, { useState, useEffect } from 'react';
import { DossierComment, ReactionState, ResearcherUser, CommentReply } from '../types/dossier';
import { storageService } from '../services/storage';
import { 
  ThumbsUp, ThumbsDown, MessageSquare, Send, Trash2, 
  User, ShieldCheck, Crown, Sparkles, MessageCircle, AlertCircle, CornerDownRight, Reply
} from 'lucide-react';

interface CommentSectionProps {
  targetId: string;
  targetTitle: string;
  currentUser: ResearcherUser;
  onOpenAuthModal?: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  targetId,
  targetTitle,
  currentUser,
  onOpenAuthModal,
}) => {
  const [reaction, setReaction] = useState<ReactionState>({ likes: 0, dislikes: 0, userVote: null });
  const [comments, setComments] = useState<DossierComment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  // Reply States
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // Load reactions and comments from storage
    const currentReaction = storageService.getReactions(targetId, currentUser.id);
    const currentComments = storageService.getComments(targetId);
    setReaction(currentReaction);
    setComments(currentComments);
  }, [targetId, currentUser.id]);

  const handleToggleReaction = (type: 'like' | 'dislike') => {
    const updated = storageService.toggleReaction(targetId, type, currentUser.id);
    setReaction(updated);
    if (currentUser.isLoggedIn) {
      storageService.addActivity(
        currentUser.name,
        `${type === 'like' ? 'liked' : 'disliked'} "${targetTitle}"`,
        'like'
      );
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (!currentUser.isLoggedIn) {
      setNotice('Please sign in to post comments.');
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    const comment: DossierComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      targetId,
      authorName: currentUser.name,
      authorEmail: currentUser.email,
      authorRole: currentUser.roleTitle,
      authorCapability: currentUser.capability,
      timestamp: new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false 
      }) + ' UTC',
      content: newCommentText.trim(),
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    const updatedComments = storageService.addComment(comment);
    setComments(updatedComments);
    storageService.addActivity(currentUser.name, `commented on "${targetTitle}"`, 'comment');
    setNewCommentText('');
    setNotice(null);
  };

  const handlePostReply = (commentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    if (!currentUser.isLoggedIn) {
      setNotice('Please sign in to reply to comments.');
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    const reply: CommentReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      authorName: currentUser.name,
      authorEmail: currentUser.email,
      authorRole: currentUser.roleTitle,
      authorCapability: currentUser.capability,
      timestamp: new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false 
      }) + ' UTC',
      content: replyText.trim(),
    };

    const updatedComments = storageService.addCommentReply(commentId, reply, targetId);
    setComments(updatedComments);
    storageService.addActivity(currentUser.name, `replied to comment on "${targetTitle}"`, 'comment');
    setReplyText('');
    setReplyingToId(null);
  };

  const handleDeleteComment = (commentId: string) => {
    const updated = storageService.deleteComment(commentId, targetId);
    setComments(updated);
  };

  const handleDeleteReply = (commentId: string, replyId: string) => {
    const updated = storageService.deleteCommentReply(commentId, replyId, targetId);
    setComments(updated);
  };

  const handleReactComment = (commentId: string, type: 'like' | 'dislike') => {
    const updated = storageService.reactToComment(commentId, type, targetId, currentUser.id);
    setComments(updated);
  };

  return (
    <section className="mt-10 border-t border-[#1e3226] pt-8 font-sans">
      
      {/* Target Title & Reaction Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#070e0a] border border-[#1a2c21] rounded-xl shadow-lg">
        
        <div>
          <div className="text-[11px] font-mono text-[#c5a059] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Feedback & Peer Appraisal</span>
          </div>
          <h3 className="text-base font-display font-bold text-[#f5eedf] mt-0.5">
            Reactions & Discussion on {targetTitle}
          </h3>
        </div>

        {/* Global Like & Dislike Counter Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          
          {/* Like Button */}
          <button
            onClick={() => handleToggleReaction('like')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all active:scale-95 cursor-pointer ${
              reaction.userVote === 'like'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50'
                : 'bg-[#0a140f] border-[#1e3427] text-[#9db2a5] hover:border-[#355842] hover:text-[#f0ece1]'
            }`}
            title="Approve / Like this document"
          >
            <ThumbsUp className={`w-4 h-4 ${reaction.userVote === 'like' ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span className="font-bold">{reaction.likes}</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">Likes</span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={() => handleToggleReaction('dislike')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-all active:scale-95 cursor-pointer ${
              reaction.userVote === 'dislike'
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-md shadow-rose-950/50'
                : 'bg-[#0a140f] border-[#1e3427] text-[#9db2a5] hover:border-[#355842] hover:text-[#f0ece1]'
            }`}
            title="Disapprove / Dislike this document"
          >
            <ThumbsDown className={`w-4 h-4 ${reaction.userVote === 'dislike' ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span className="font-bold">{reaction.dislikes}</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">Dislikes</span>
          </button>

        </div>

      </div>

      {/* Notice Banner */}
      {notice && (
        <div className="mt-4 p-3 bg-amber-950/50 border border-amber-700/60 rounded-lg text-amber-300 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Post Comment Input Form */}
      <div className="mt-6 p-4 sm:p-5 bg-[#050907] border border-[#17271e] rounded-xl space-y-3">
        
        <div className="flex items-center justify-between text-xs font-mono text-[#819488]">
          <div className="flex items-center gap-2">
            {currentUser.isDeveloper ? (
              <Crown className="w-4 h-4 text-[#c5a059]" />
            ) : currentUser.isLoggedIn ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <User className="w-4 h-4 text-amber-400" />
            )}
            <span className="font-bold text-[#f0ece1]">{currentUser.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#101c15] border border-[#1e3327] text-[#91a398]">
              {currentUser.roleTitle}
            </span>
          </div>

          {!currentUser.isLoggedIn && onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className="text-xs text-[#c5a059] hover:underline font-semibold"
            >
              Sign In to Post
            </button>
          )}
        </div>

        <form onSubmit={handlePostComment} className="space-y-3">
          <textarea
            rows={3}
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={
              currentUser.isLoggedIn
                ? `Share your analytical notes or peer appraisal regarding ${targetTitle}...`
                : 'Sign in with Google/Microsoft to join the discussion...'
            }
            className="w-full bg-[#080e0b] border border-[#1d3226] focus:border-[#c5a059] rounded-lg p-3 text-xs text-[#f5eedf] placeholder-[#5f7368] focus:outline-none transition-colors leading-relaxed"
          />

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#5b6e62]">
              Markdown & technical notes supported
            </span>

            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-4 py-2 rounded-lg bg-[#c5a059] hover:bg-[#d8b26a] disabled:opacity-40 disabled:pointer-events-none text-black font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

      </div>

      {/* Comment List */}
      <div className="mt-6 space-y-3 font-mono text-xs">
        
        <div className="flex items-center justify-between text-xs text-[#7e9185] border-b border-[#18281e] pb-2">
          <span className="font-bold flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-[#c5a059]" />
            <span>Comments ({comments.length})</span>
          </span>
          <span className="text-[10px]">Real-time Archival Feed</span>
        </div>

        {comments.length === 0 ? (
          <div className="p-8 text-center bg-[#050806] border border-[#15231a] rounded-xl text-[#65786c]">
            No peer comments registered yet for this document. Be the first to post an appraisal!
          </div>
        ) : (
          comments.map((comment) => {
            const isAuthor = currentUser.email === comment.authorEmail || currentUser.name === comment.authorName;
            const canDelete = isAuthor || currentUser.isDeveloper || currentUser.capability === 'PRINCIPAL_ARCHITECT';

            return (
              <div 
                key={comment.id}
                className="p-4 bg-[#070c09] border border-[#17271d] hover:border-[#233a2c] rounded-xl transition-all space-y-2.5"
              >
                {/* Comment Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#f5eedf]">{comment.authorName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#101c15] border border-[#1e3327] text-[#86998e]">
                      {comment.authorRole}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[#5e7165]">
                    <span>{comment.timestamp}</span>
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-rose-400 hover:text-rose-300 p-0.5 transition-colors"
                        title="Delete comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="font-sans text-xs sm:text-sm text-[#d0dad4] leading-relaxed whitespace-pre-line">
                  {comment.content}
                </p>

                {/* Per-Comment Reaction & Reply Buttons */}
                <div className="flex items-center justify-between pt-1 border-t border-[#121f17] text-[10px] text-[#718578]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleReactComment(comment.id, 'like')}
                      className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{comment.likes}</span>
                    </button>

                    <button
                      onClick={() => handleReactComment(comment.id, 'dislike')}
                      className="flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <ThumbsDown className="w-3 h-3" />
                      <span>{comment.dislikes}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                    className="flex items-center gap-1 text-[#c5a059] hover:text-[#e6c679] transition-colors cursor-pointer font-bold"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>{replyingToId === comment.id ? 'Cancel' : 'Reply'}</span>
                  </button>
                </div>

                {/* Inline Reply Form */}
                {replyingToId === comment.id && (
                  <form onSubmit={(e) => handlePostReply(comment.id, e)} className="mt-3 p-3 bg-[#040806] border border-[#1b2f23] rounded-lg space-y-2">
                    <div className="text-[10px] text-[#c5a059] font-mono font-bold flex items-center gap-1">
                      <Reply className="w-3 h-3" />
                      <span>Reply to {comment.authorName}</span>
                    </div>
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full bg-[#080f0c] border border-[#1b2d22] rounded p-2 text-xs text-[#f5eedf] focus:outline-none focus:border-[#c5a059]"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="px-3 py-1 bg-[#c5a059] hover:bg-[#d8b26a] disabled:opacity-40 text-black font-bold text-[11px] rounded flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit Reply</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Nested Replies List */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-3 border-l-2 border-[#1c3326] space-y-2 pt-1">
                    {comment.replies.map((reply) => {
                      const isReplyAuthor = currentUser.email === reply.authorEmail || currentUser.name === reply.authorName;
                      const canDeleteReply = isReplyAuthor || currentUser.isDeveloper || currentUser.capability === 'PRINCIPAL_ARCHITECT';

                      return (
                        <div key={reply.id} className="p-2.5 rounded bg-[#040806] border border-[#14231b] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[#e6c679]">{reply.authorName}</span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-[#0e1a13] border border-[#1e3327] text-[#86998e]">
                                {reply.authorRole}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[9px] text-[#5e7165]">
                              <span>{reply.timestamp}</span>
                              {canDeleteReply && (
                                <button
                                  onClick={() => handleDeleteReply(comment.id, reply.id)}
                                  className="text-rose-400 hover:text-rose-300 p-0.5"
                                  title="Delete reply"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="font-sans text-xs text-[#cad5cf] leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })
        )}

      </div>

    </section>
  );
};
