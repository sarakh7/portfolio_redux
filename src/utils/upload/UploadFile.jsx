import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';
import { createFile } from '../../services/themeServices';
import { useEffect } from 'react';
import { getFileById } from './../../services/themeServices';

const UploadFile = ({ fileId, setFileId }) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    getBase64(info.file.originFileObj, async (url) => {

      // console.log(info.file.originFileObj)
      try {
        const { data: createdFile, status } = await createFile({
          name: info.file.originFileObj.name,
          content: url
        });

        if (status === 201) {
          setFileId(createdFile.id);
          setLoading(false);
          setImageUrl(createdFile.content);
        }

      } catch (err) {
        console.log(err)
      }

    });

  };

  useEffect(() => {
    const fetch = async () => {
      if (fileId) {
        try {
          const { data, status } = await getFileById(fileId);
          if (status === 200) {
            setImageUrl(data.content);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetch();
  }, []);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action=""
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) :
        uploadButton
      }
    </Upload>
  );
}

export default UploadFile;  