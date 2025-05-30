import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Props {
    buttonText: string;
    imageBlogData: () => any;
}

const QRCodeDownloader = (props: Props) => {
    const { buttonText, imageBlogData } = props;
    const [downloadType, setDownloadType] = useState('png');

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
        <>
            <div className="flex items-center rounded-md border border-blue-500 bg-blue-500">
                <Button
                    type="button"
                    onClick={() =>
                        qrcodeDownload(imageBlogData(), downloadType)
                    }
                    className="w-full rounded-md rounded-r-none border-none px-1 py-2.5 text-sm font-medium capitalize hover:shadow-none"
                >
                    {buttonText}
                </Button>

                <Select
                    name="qr_download"
                    defaultValue="png"
                    onValueChange={(value) => setDownloadType(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select download type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export default QRCodeDownloader;
