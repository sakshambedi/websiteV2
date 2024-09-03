

export interface BlogPostTableInterface {
    slug: string;
    title: string;
    date: Date;
    category: string
}


export interface BlogPostInterface {
    slug: string;
    mdFile: string;
    fullPath: string;
    title: string;
    date: Date;
    contentHtml: string
}

export type AllPostDataTableInterface = BlogPostTableInterface[] 