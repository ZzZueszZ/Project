import React from 'react';
import {
  Form,
  Button,
  Input,
  Modal,
  notification,
  Spin,
  Space,
  Divider,
  Row,
  Col,
  // Select,
} from 'antd';
import {FormattedMessage} from '@@/plugin-locale/localeExports';
import {useRequest} from '@@/plugin-request/request';
import {changePassword} from '../service';

interface FormProps {
  initValue: { userId: string }
  onFinish: () => void;
  showForm: boolean;
}

const FormItem = Form.Item;

const ChangePasswordForm: React.FC<FormProps> = (props) => {
  const {onFinish, showForm} = props;
  const close = () => {
    onFinish();
  };

  const {loading: loadingSave, run: saveRun} = useRequest(changePassword, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: 'Change password successful!',
      });
      close();
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message;
      notification.error({
        message: 'Change password fail!',
        description: errorMsg ? errorMsg : ''
      });
    }
  });

  return (
    <>
      <Modal
        width={800}
        destroyOnClose
        maskClosable={false}
        title={<FormattedMessage
          id="pages.cms.accounts.form.changepassword"
          defaultMessage="Change password"
        />}
        open={showForm}
        onCancel={close}
        footer={null}
      >
        <Spin spinning={loadingSave}>
          <Form
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            onValuesChange={() => {
            }}
            onFinish={async (values) => {
              await saveRun({userId: props.initValue.userId, ...values});
            }}
          >
            <FormItem
              name="oldPassword"
              label="Old password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password/>
            </FormItem>
            <FormItem
              name="password"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password/>
            </FormItem>
            <FormItem
              name="passwordConfirm"
              label="Confirm New Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password/>
            </FormItem>
            <Divider/>
            <Row>
              <Col span={18} offset={6}>
                <Space>
                  <Button onClick={close}>
                    <FormattedMessage id="common.cancel" defaultMessage="Cancel"/>
                  </Button>
                  <Button type="primary" htmlType="submit">
                    <FormattedMessage id="common.save" defaultMessage="Save"/>
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default ChangePasswordForm;
