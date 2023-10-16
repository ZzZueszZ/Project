import React, {useState} from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Skeleton,
  Space,
  Spin,
  TimePicker
} from 'antd'
import {Setting} from "../data";
import Editor from "@/components/RichEditor";
import UploadImage from "@/components/UploadImage";
import {useRequest} from "@@/plugin-request/request";
import {getSettings, update} from "../service";
import {InfoCircleOutlined} from "@ant-design/icons";
import TestSMTPEmail from "@/components/TestSMTPEmail";

const FormItem = Form.Item;

export type SettingFormProps = {
  groupCode: string;
}

const SettingForm: React.FC<SettingFormProps> = (props) => {
  const {groupCode} = props
  const [form] = Form.useForm()
  const {TextArea} = Input

  const [reloadData, setReloadData] = useState<boolean>(false)

  const {
    data: settings,
    loading: loadingSettings
  } = useRequest(() => getSettings(groupCode), {
    refreshDeps: [reloadData],
    formatResult: (res: { settingInfos: Setting[] }) => res
  })

  const {loading: loadingUpdate, run: updateRun} = useRequest(update, {
    manual: true,
    onSuccess: () => notification.success({
      message: 'Cập nhật thành công!',
    })
  });

  return loadingSettings ? <Skeleton active/> : <Spin spinning={loadingUpdate}>
    <Form
      key={groupCode}
      labelCol={{span: 6}}
      wrapperCol={{span: 18}}
      form={form}
      initialValues={settings?.settingInfos.reduce((pre, item) => ({...pre, [`${item.code}`]: item.value}), {})}
      onFinish={async (values: any) => {
        await updateRun(groupCode, Object.entries(values).reduce<Setting[]>((previousValue, [code, value]) => ([...previousValue, {
          code,
          value
        } as Setting]), []))
      }}
    >
      {settings?.settingInfos.map(({code, type = 'TEXT', name, required, description, options = ''}) => {

        if (type === 'UPLOAD') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <UploadImage/>
        </FormItem>

        if (type === 'TEXTAREA') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <TextArea/>
        </FormItem>

        if (type === 'RICHTEXT') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <Editor/>
        </FormItem>

        if (type === 'NUMBER') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <InputNumber
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => `${value}`.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>

        if (type === 'PHONE') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <Input/>
        </FormItem>

        if (type === 'EMAIL') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}, {message: `${name} không hợp lệ`, type: 'email'}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <Input/>
        </FormItem>

        if (type === 'DATE') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <DatePicker/>
        </FormItem>

        if (type === 'DATETIME') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <DatePicker showTime/>
        </FormItem>

        if (type === 'TIME') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <TimePicker/>
        </FormItem>

        if (type === 'TEXT' && options !== '') return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        ><Radio.Group buttonStyle="solid">
          {
            options.split('||').map((item, index) => <Radio.Button key={`${code}-${index}`}
                                                                   value={item}>{item}</Radio.Button>)
          }
        </Radio.Group></FormItem>

        return <FormItem
          key={`form-item${code}`}
          name={code}
          label={name}
          rules={[{required, message: `${name} bắt buột`}]}
          tooltip={description && {title: description, icon: <InfoCircleOutlined/>}}
        >
          <Input/>
        </FormItem>
      })}
      <FormItem wrapperCol={{offset: 6, span: 18}}>
        <Space>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
          <Button onClick={() => setReloadData(!reloadData)}>
            Tải lại
          </Button>
          {groupCode === 'MAIL-SENDER' && <TestSMTPEmail parentData={() => form.getFieldsValue()}/>}
        </Space>
      </FormItem>
    </Form>
  </Spin>
};

export default SettingForm;
