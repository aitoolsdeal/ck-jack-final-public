import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Props {
    data: any;
    route: string;
    firstPage: boolean;
}

const Pagination = (props: Props) => {
    const { data, route, firstPage } = props;
    const first = data.data[0];
    const last = data.data[data.data.length - 1];

    const gotoRoute = (data: any) => {
        router.get(route, data);
    };

    return (
        <div className="flex items-center justify-center gap-5 p-6">
            <Button
                color="white"
                disabled={firstPage}
                onClick={() =>
                    gotoRoute({
                        ending_before: first.id,
                    })
                }
                className="h-8 px-2 sm:px-3"
            >
                {'<<Prev'}
            </Button>

            <Button
                color="white"
                disabled={!data.has_more}
                onClick={() =>
                    gotoRoute({
                        starting_after: last.id,
                    })
                }
                className="h-8 px-2 sm:px-3"
            >
                {'Next>>'}
            </Button>
        </div>
    );
};

export default Pagination;
