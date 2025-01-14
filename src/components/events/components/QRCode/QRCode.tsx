import { useEffect, useRef, useState } from "preact/hooks";
import QRCodeStyling, { type FileExtension } from "qr-code-styling";
import Button from "../Button/Button";

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  // image:
  //   "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  image: "/pb-qr-logo.png",
  dotsOptions: {
    color: "#000",
    type: "rounded",
    roundSize: true
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#000'
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 2,
    // imageSize: 100
  },
});

type QRCodeProps = {
  url: string;
  fileExt?: FileExtension;
};

export default function QRCode({ url: siteUrl }: QRCodeProps) {
  const fullUrl = new URL(siteUrl);
  fullUrl.searchParams.set("data", "foobar_params");

  const [url, _setUrl] = useState(fullUrl.toString());
  const [fileExt, _setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current == null) return;
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt as FileExtension,
    });
  };

  return (
    <div class="flex flex-col justify-center gap-4">
      <div class="flex items-center justify-center">
        <div class="mx-auto p-2 md:p-4 bg-white" ref={ref} />
      </div>

      <div class="flex justify-center gap-2">
        <Button onClick={onDownloadClick} text="Download" />
      </div>
    </div>
  );
}
