"use client";
import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";
import {Alert} from "@/components/bootstrap";
export default function SearchPage() {
    const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
    const [searchResultsloading, setSearchResultsLoading] = useState(false);
    const [searchResultsloadingIsError, setSearchResultsLoadingIsError] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if (query) {
            try {
                setSearchResults(null);
                setSearchResultsLoading(true);
                setSearchResultsLoadingIsError(false);
                const response = await fetch("/api/search?query=" + query);
                const images: UnsplashImage[] = await response.json();
                setSearchResults(images);

            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }
        }
    }

    return (
        <div>
            <Alert>
                this page <strong> fetches data client side</strong>
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                        name="query"
                        placeholder="E.g cats, hotdogs, ..."
                    />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsloading}>Search</Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {searchResultsloading && <Spinner animation="border" />}
                {searchResultsloadingIsError && <p>Something went wrong</p>}
                {searchResults?.length === 0 && <p>Nothing found</p>}
            </div>

            {searchResults &&
                <>
                    {searchResults.map(image => (
                        <Image
                            src={image.urls.raw}
                            width={250}
                            height={250}
                            alt={image.description}
                            key={image.urls.raw}
                            className={styles.image}
                        />
                    ))}
                </>
            }
        </div>
    );
}
