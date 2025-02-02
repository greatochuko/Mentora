export type ReviewType = {
  _id: string;
  title: string;
  content: string;
  user: {
    name: string;
    profilePicture: string;
    role: "Student" | "Tutor";
  };
  rating: number;
};

export default function ReviewCard({
  review,
  className,
}: {
  review: ReviewType;
  className?: string;
}) {
  return (
    <div
      className={`flex snap-center snap-always flex-col gap-3 rounded-md border border-zinc-300 p-6 sm:snap-start ${className}`}
    >
      <h4 className="font-medium">{review.title}</h4>
      <p className="text-sm text-zinc-500">{review.content}</p>

      <hr className="mt-auto border-zinc-200" />

      <div className="flex items-center gap-2">
        <img
          src={review.user.profilePicture}
          alt={`${review.user.name}'s profile picture`}
          className="h-10 w-10 overflow-hidden rounded-full bg-zinc-200"
        />
        <div className="flex flex-1 flex-col justify-between">
          <p className="text-sm font-medium">{review.user.name}</p>
          <span className="text-xs text-zinc-500">{review.user.role}</span>
        </div>
      </div>
    </div>
  );
}
