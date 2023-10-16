import React, {useMemo} from "react";
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import {Editor} from '@tinymce/tinymce-react';
import {upload} from "@/services/upload";

type Props = {
  value?: string;
  onChange?: (content: string) => void;
};

const RichEditor = (props: Props) => {

  const {value = '', onChange} = props;

  return useMemo(() => <Editor
    initialValue={value}
    init={{
      skin: false,
      content_css: false,
      height: 500,
      menubar: 'edit insert format table',
      plugins: [
        'link image code preview',
        'table paste'
      ],
      images_upload_handler: async (
        blobInfo: any,
        success: (url: string) => void,
      ) => {
        const response = await upload(blobInfo.blob())
        success(`${response.value}?type=resize&width=1000&height=1000`)
      },
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      toolbar:
        'image | undo redo | formatselect | bold italic backcolor link| \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat code | help'
    }}
    onEditorChange={onChange}
  />, [])
}

export default RichEditor;

