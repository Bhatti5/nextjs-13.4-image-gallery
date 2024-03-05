import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from ".TopicPage.module.css";
import {Alert} from "@/components/bootstrap";
import { Metadata } from "next";
//export const revalidate =0;

//export const dynamicParams= false;

interface PageProps{
    params: { topic: string},
}

export function generateMetadata({params:{topic} }: PageProps): Metadata{
    return {
        title: topic +" - NextJS 13.4"
    }
}

export function generateStaticParams(){
    return ["health","fitness","coding"].map((topic)=>({ topic}));
}

export default async function Page({ params:{ topic} }: PageProps) {
    const response =await fetch (`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${ process.env.UNSPLASH_ACCESS_KEY}`)
    const images: UnsplashImage[] = await response.json();


    return(

    <div>
    <Alert>
        This page uses <strong> generate Static Params</strong>
    </Alert>
        <h1>{topic}</h1> 
        {
            images.map(image =>(
                <Image
                src={image.urls.raw}
                width={250}
                height={250}
                alt={image.description}
                key={image.urls.raw}
                className="styles.image"
                />
            ))
        }
    </div>
)
}