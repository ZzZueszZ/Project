import React, { useMemo, useState } from 'react';
import { Button, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import { upload } from '@/services/upload';
import styles from './index.less';

type Props = {
  value?: string;
  onChange?: (content: string) => void;
};

const UploadImage: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [imageUrl, setImgUrl] = useState(value);

  const uploadFile = async (file: File) => {
    const response = await upload(file);
    setImgUrl(response.value);
    onChange?.(response.value);
    return false;
  };

  const imageView = useMemo(
    () => (
      <div className={styles.image}>
        {imageUrl && <img src={`${imageUrl}?type=resize&width=150&height=150`} alt="avatar" />}
        {!imageUrl && (
          <img
            src="https://shiphangus.vn/cdn/tmtapps/upload/images/1632215145854.png?type=resize&width=150&height=150"
            alt="avatar"
          />
        )}
      </div>
    ),
    [imageUrl],
  );

  return (
    <Space className={styles.UploadImage}>
      {imageView}
      <Upload showUploadList={false} beforeUpload={uploadFile}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            <FormattedMessage id="pages.cms.contents.msg.upload" defaultMessage="Upload" />
          </Button>
        </div>
      </Upload>
    </Space>
  );
};

export default UploadImage;
