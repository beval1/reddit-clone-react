import { ISubreddit } from "../api/interfaces/ISubreddit";
import { IUser } from "../api/interfaces/IUser";

export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: (value: React.SetStateAction<any>) => void
) => {
    setState((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value.trim(),
    }));
};

export const calculateTimePassed = (dateString: string): string => {
    let prevTime = new Date(dateString);
    let thisTime = new Date(); // now
    let diff = thisTime.getTime() - prevTime.getTime(); // now - createdOn
    let daysPassed = diff / (1000 * 60 * 60 * 24); // positive number of days
    let hours = diff / (1000 * 60 * 60); // positive number of hours
    let minutes = diff / (1000 * 60); // positive number of minutes
    if (hours > 24) {
        return `${Math.floor(daysPassed)} days ago`;
    } else if (hours > 1) {
        return `${Math.floor(hours)} hours ago`;
    } else {
        return `${Math.floor(minutes)} minutes ago`;
    }
};

export const isUserAlreadyJoinedSubreddit = (user: IUser | null, subreddit: ISubreddit | null): boolean => {
    if (!user || !subreddit) {
        return false;
    }

    return user.subreddits.find(s => s.id === subreddit.id) ? true : false;
}