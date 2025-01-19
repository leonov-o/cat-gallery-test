import {CardGrid} from "./CardGrid.tsx";
import {RefObject, useEffect, useState} from "react";
import {useInfiniteQuery, useQueryClient} from "react-query";
import {catService} from "../entities/cat/cat.service.ts";
import {useInView} from "react-intersection-observer";
import {useUserStore} from "../store";
import {toast} from "react-toastify";


export const CatGallery = () => {
    const {filters} = useUserStore();
    const [page, setPage] = useState(0);

    const queryClient = useQueryClient();
    const {data, isLoading, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['cats', filters.breed],
        queryFn: () => catService.getCats(page, 20, filters.breed),
        getNextPageParam: () => page,
        refetchOnWindowFocus: false,
        select: (data) => {
            const uniqueCats = new Set();
            const filteredPages = data.pages.map((page) =>
                page.filter((cat) => {
                    if (uniqueCats.has(cat.id)) return false;
                    uniqueCats.add(cat.id);
                    return true;
                })
            );
            return { ...data, pages: filteredPages };
        },
        onError: () => {
            toast("Something went wrong", {type: "error"})
        }
    });

    const {ref, inView} = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
            setPage(page => page + 1)
        }
    }, [fetchNextPage, inView])

    useEffect(() => {
        queryClient.resetQueries();
    }, [queryClient, filters]);

    return (
        <div>
            <CardGrid data={data?.pages.flat()} isLoading={isLoading}/>
            <div ref={ref as RefObject<HTMLDivElement>} className="flex h-24 items-center justify-center">
                {
                    isFetchingNextPage && (
                        <img src="../../public/cat.gif" alt="loader" className="w-20"/>
                    )
                }
            </div>
        </div>
    );
};
