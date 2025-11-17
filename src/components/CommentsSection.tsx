import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { MessageCircle, Reply, SendHorizontal } from 'lucide-react';

interface Comment {
  id: string;
  username: string;
  points: number;
  text: string;
  timestamp: string;
  avatarUrl?: string;
}

interface CommentsSectionProps {
  dealId: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    username: 'FoodieExplorer',
    points: 2450,
    text: 'Just tried this deal yesterday! The truffle flavor was incredible and the portion size was perfect. Definitely worth it at this price point.',
    timestamp: '2 hours ago',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '2',
    username: 'TasteSeeker',
    points: 1820,
    text: 'Great deal! The restaurant has a nice ambiance too. Perfect for a date night without breaking the bank.',
    timestamp: '5 hours ago',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '3',
    username: 'LocalFoodie',
    points: 3100,
    text: 'Been coming here for years and this is one of their best dishes. The discount makes it even better! Highly recommend ordering extra bread to soak up the sauce.',
    timestamp: '1 day ago',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
  },
  {
    id: '4',
    username: 'DealHunter123',
    points: 890,
    text: 'Solid deal but arrived a bit cold. Still tasty though! Maybe better for pickup rather than delivery.',
    timestamp: '2 days ago',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
  }
];

export function CommentsSection({ dealId }: CommentsSectionProps) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (commentId: string, username: string) => {
    setActiveReplyId(commentId);
    setReplyText('');
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      console.log('Sending comment:', commentText);
      // Here you would implement send functionality
      setCommentText('');
      setIsInputActive(false);
    }
  };

  const handleSendReply = (commentId: string, username: string) => {
    if (replyText.trim()) {
      console.log(`Sending reply to ${username}:`, replyText);
      // Here you would implement send reply functionality
      setReplyText('');
      setActiveReplyId(null);
    }
  };

  return (
    <div className="px-4 py-6 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-medium text-foreground">Comments ({mockComments.length})</h3>
      </div>
      
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
              <span className="text-muted-foreground text-sm">You</span>
            </div>
          </Avatar>
          {!isInputActive ? (
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-muted-foreground"
              onClick={() => setIsInputActive(true)}
            >
              Add a comment...
            </Button>
          ) : (
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-input rounded-md bg-background">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <button
                onClick={handleSendComment}
                className="p-1"
                disabled={!commentText.trim()}
              >
                <SendHorizontal 
                  className={`w-5 h-5 transition-colors ${
                    commentText.trim() ? 'text-red-500' : 'text-muted-foreground'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {mockComments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <img 
                  src={comment.avatarUrl} 
                  alt={comment.username}
                  className="w-full h-full object-cover rounded-full"
                />
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{comment.username}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span className="text-sm text-muted-foreground">{comment.points.toLocaleString()} pts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-foreground leading-relaxed">{comment.text}</p>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground p-0 h-auto font-normal"
                  onClick={() => handleReply(comment.id, comment.username)}
                >
                  <Reply className="w-4 h-4 mr-1" />
                  Reply
                </Button>

                {activeReplyId === comment.id && (
                  <div className="flex items-center gap-3 pt-2">
                    <Avatar className="w-8 h-8">
                      <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">You</span>
                      </div>
                    </Avatar>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-input rounded-md bg-background">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${comment.username}...`}
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSendReply(comment.id, comment.username)}
                        className="p-1"
                        disabled={!replyText.trim()}
                      >
                        <SendHorizontal 
                          className={`w-5 h-5 transition-colors ${
                            replyText.trim() ? 'text-red-500' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}