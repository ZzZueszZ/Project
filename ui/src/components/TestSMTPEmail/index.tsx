import React, {useState} from "react";
import {Button, Form, Input, Modal, notification, Space, Spin} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {useRequest} from "@@/plugin-request/request";
import {testSMTPEMail} from "@/components/TestSMTPEmail/service";

export interface SMTPInfo {
  mailFrom: string
  mailFromName: string
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  smtpAuth: string
  smtpStarttls: string
  smtpSsl: string
}

interface ErrorInfo {
  message: string
}

interface DataResponse {
  status: boolean
  errors?: ErrorInfo[],
  message: string
}

type Props = {
  parentData: () => SMTPInfo;
};

const TestSMTPEmail: React.FC<Props> = (props) => {
  const [form] = Form.useForm()
  const FormItem = Form.Item;
  const TextArea = Input.TextArea;
  const [showModal, setShowModal] = useState<boolean>(false)

  const {loading: loadingTestSMTPEMail, run: testSMTPEMailRun} = useRequest(testSMTPEMail, {
    manual: true,
    formatResult: (res: DataResponse) => res,
    onSuccess: (response: DataResponse) => {
      if (response.status) {
        notification.success({
          message: 'Cập nhật thành công!',
        })
      }
      if (!response.status) {
        notification.error({
          message: response.message
        })
      }
    }
  });

  return <>
    <Button type='dashed' onClick={() => setShowModal(true)}>Test Email</Button>
    <Modal
      destroyOnClose
      maskClosable={false}
      title='Test SMTP'
      visible={showModal}
      onCancel={() => setShowModal(false)}
      footer={<Space>
        <Button type="primary" onClick={async () => {
          try {
            await form.validateFields();
            await testSMTPEMailRun({...form.getFieldsValue(), ...props.parentData()})
          } catch (e) {
          }
        }}>
          Gửi
        </Button>
        <Button onClick={() => setShowModal(false)}>
          Thoát
        </Button>
      </Space>}
    >
      <Spin spinning={loadingTestSMTPEMail}>
        <Form
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={form}
          initialValues={{title: 'Test tiêu đề mail', body: 'Test Body mail'}}
        >
          <FormItem
            name='email'
            label='Email'
            rules={[{required: true, message: `Địa chỉ email test`}, {type: 'email', message: 'Email không hợp lệ'}]}
            tooltip={{title: 'Địa chỉ email test', icon: <InfoCircleOutlined/>}}
          >
            <Input/>
          </FormItem>

          <FormItem
            name='title'
            label='Tiêu đề'
            rules={[{required: true, message: `Tiêu đề bắt buột`}]}
            tooltip={{title: 'Tiêu đề bắt buột', icon: <InfoCircleOutlined/>}}
          >
            <Input/>
          </FormItem>

          <FormItem
            name='body'
            label='Nội dung'
            rules={[{required: true, message: `Nội dung bắt buột`}]}
            tooltip={{title: 'Nội dung bắt buột', icon: <InfoCircleOutlined/>}}
          >
            <TextArea/>
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  </>
}

export default TestSMTPEmail;
