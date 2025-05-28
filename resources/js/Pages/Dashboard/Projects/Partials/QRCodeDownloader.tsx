import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';

interface Props {
    imageBlogData: string;
}

const QRCodeDownloader = (props: Props) => {
    const { imageBlogData } = props;

    function qrcodeDownload(base64Data: string, format: string) {
        // Convert base64 to binary
        const binaryData = atob(base64Data.split(',')[1]);

        // Create Uint8Array from binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create Blob from Uint8Array
        const blob = new Blob([uint8Array], { type: `image/${format}` });

        // Create URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `qrcode.${format}`;
        link.click();

        // Clean up the URL object after download
        URL.revokeObjectURL(url);

        // Remove the anchor element after download
        setTimeout(() => {
            document.body.removeChild(link);
        }, 0);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" className="h-7 w-7 rounded-full">
                    <Download className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => qrcodeDownload(imageBlogData, 'png')}
                >
                    PNG
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => qrcodeDownload(imageBlogData, 'jpeg')}
                >
                    JPEG
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default QRCodeDownloader;
