import {message, Upload, UploadProps} from "antd";
export const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Можно загружать только изображения');
            return Upload.LIST_IGNORE;
        }
        return true;
    },
    action: 'http://localhost:44001/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} успешно загружен!`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};