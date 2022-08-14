export interface ICreatePost {
	title: string;
	comment?: { content: string };
	image?: {title?: string, multipartFile: File | null};
	link?: string;
}