import { Card } from '@/components/ui/card';
import icons from '@/icons';
import hideProgress from '@/lib/hide-progress';
import { LinkProps } from '@/types';
import { router } from '@inertiajs/react';
import { Move } from 'lucide-react';
import { useRef } from 'react';
import DeleteBlock from './DeleteBlock';
import EditBlock from './EditBlock';

interface Props {
    link: LinkProps;
}

const LinkBlocks = (props: Props) => {
    const { link } = props;
    const bioLinkItemsRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('dragging');

        const bioLink = document.getElementById('bioLinkItems');
        if (bioLink) {
            const elements = bioLink.getElementsByTagName('div');
            const updatedLinkItemPosition = [];

            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                const id = parseInt(element.dataset.item_id || '');
                if (id) updatedLinkItemPosition.push({ id, position: i + 1 });
            }

            hideProgress();
            router.put(route('biolink-block.position', { id: link.id }), {
                linkItems: updatedLinkItemPosition,
            });
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(
            bioLinkItemsRef.current!,
            e.clientY,
        );
        const draggable: any = document.querySelector('.dragging');

        if (afterElement == null) {
            bioLinkItemsRef.current?.appendChild(draggable);
        } else {
            bioLinkItemsRef.current?.insertBefore(draggable, afterElement);
        }
    };

    const getDragAfterElement = (
        container: HTMLElement,
        y: number,
    ): HTMLElement | null => {
        const draggableElements = [
            ...container.querySelectorAll<HTMLElement>(
                '.draggable:not(.dragging)',
            ),
        ];

        return draggableElements.reduce(
            (closest: any, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY, element: null },
        ).element;
    };

    return (
        <div
            id="bioLinkItems"
            className="bioLinkItems"
            ref={bioLinkItemsRef}
            onDragOver={handleDragOver}
        >
            {link.items.map((item) => {
                const Icon = icons[item.item_icon];

                return (
                    <Card
                        draggable
                        key={item.id}
                        data-item_id={item.id}
                        className="draggable mb-6 flex items-center"
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <Move
                            id="elementMove"
                            className="ml-6 h-6 w-6 cursor-grab"
                        />
                        <div className="card flex w-full items-center justify-between p-5 font-medium">
                            <Icon className="h-5 w-5" />
                            <span>{item.item_title}</span>
                            <div className="flex items-center gap-2">
                                <EditBlock block={item} />
                                <DeleteBlock block={item} />
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default LinkBlocks;
