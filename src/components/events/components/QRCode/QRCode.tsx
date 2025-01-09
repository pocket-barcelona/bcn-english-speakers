import { useEffect, useRef, useState } from "preact/hooks";
import QRCodeStyling, { type FileExtension } from "qr-code-styling";
import Button from "../Button/Button";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
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

  const [url, setUrl] = useState(fullUrl.toString());
  const [fileExt, setFileExt] = useState("png");
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

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onUrlChange = (event: any) => {
    event.preventDefault();
    setUrl(event.target.value ?? "");
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onExtensionChange = (event: any) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt as FileExtension,
    });
  };

  return (
    <div class="flex flex-col justify-center gap-4">
      {/* <div class="flex flex-col justify-center">
        <input value={url} onChange={onUrlChange} />
      </div> */}

      <div class="flex items-center justify-center">
        <div class="mx-auto" ref={ref} />
      </div>

      <div class="flex justify-center gap-2">
        {/* <select onChange={onExtensionChange} value={fileExt} class="flex-grow">
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select> */}
        <Button onClick={onDownloadClick} text="Download" />
      </div>
    </div>
  );
}
