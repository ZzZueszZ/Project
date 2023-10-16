import React, { useMemo } from 'react';
import {
  Form,
  Button,
  Input,
  Modal,
  Radio,
  notification,
  Spin,
  Skeleton,
  Space,
  Divider,
  Row,
  Col,
  // Select,
} from 'antd';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
// import UploadImage from '@/components/UploadImage';
import { useRequest } from '@@/plugin-request/request';
import { save, findBy } from '../service';
import type { ShowForm, User } from '../data.d';
import { emptyModel } from '../data.d';
// import type { Role } from '@/pages/cms/roles/data';

interface FormProps {
  onFinish: () => void;
  showForm: ShowForm;
}

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const UpdateForm: React.FC<FormProps> = (props) => {
  const { onFinish, showForm } = props;
  const close = () => {
    onFinish();
  };

  const { data, loading: loadingData } = useRequest(
    () => findBy({ userId: showForm?.data?.userId, action: showForm.action }),
    {
      refreshDeps: [showForm],
      formatResult: (res: { value: User }) => res,
    },
  );

  // const { data: rolesData } = useRequest(() => findAllRoles(), {
  //   refreshDeps: [showForm],
  //   formatResult: (res: { data: Role[] }) => res.data,
  // });
  //
  // const convertData = (datas: Role[]) => {
  //   return (
  //     datas &&
  //     datas.map((v) => ({
  //       value: v.name,
  //       label: v.name,
  //     }))
  //   );
  // };

  const { loading: loadingSave, run: saveRun } = useRequest(save, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: 'Cập nhật thành công!',
      });
      close();
    }
  });

  const renderForm = useMemo(() => {
    const dataFrom = showForm.action === 'ADD' ? emptyModel : { ...emptyModel, ...data?.value };
    return (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={dataFrom}
        onValuesChange={() => {}}
        onFinish={async (values) => {
          await saveRun({ ...emptyModel, ...data?.value, ...values });
        }}
      >
        <FormItem
          name="username"
          label={
            <FormattedMessage
              id="pages.cms.accounts.msg.titleUserName"
              defaultMessage="User Name"
            />
          }
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.cms.accounts.form.field.userName.errors"
                  defaultMessage="This field isn't empty!"
                />
              ),
            },
          ]}
        >
          <Input readOnly={showForm.action === 'UPDATE'} />
        </FormItem>
        <FormItem
          name="email"
          label={<FormattedMessage id="pages.cms.accounts.msg.titleEmail" defaultMessage="Email" />}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.cms.accounts.form.field.name.errors"
                  defaultMessage="This field isn't empty!"
                />
              ),
            },
          ]}
        >
          <Input readOnly={showForm.action === 'UPDATE'} />
        </FormItem>
        <FormItem
          name="status"
          label={
            <FormattedMessage id="pages.cms.accounts.msg.titleStatus" defaultMessage="Status" />
          }
        >
          <RadioGroup buttonStyle="solid">
            <Radio.Button value="ACTIVE">
              <FormattedMessage
                id="pages.cms.accounts.form.field.status.active"
                defaultMessage="ACTIVE"
              />
            </Radio.Button>
            <Radio.Button value="LOCKED">
              <FormattedMessage
                id="pages.cms.accounts.form.field.status.locked"
                defaultMessage="LOCKED"
              />
            </Radio.Button>
            <Radio.Button value="DELETED">
              <FormattedMessage
                id="pages.cms.accounts.form.field.status.deleted"
                defaultMessage="DELETED"
              />
            </Radio.Button>
            <Radio.Button value="EXPIRED">
              <FormattedMessage
                id="pages.cms.accounts.form.field.status.expired"
                defaultMessage="EXPIRED"
              />
            </Radio.Button>
          </RadioGroup>
        </FormItem>
        <FormItem label="Full name" style={{ marginBottom: 0 }} required={true}>
          <FormItem
            name="firstName"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input />
          </FormItem>
          <FormItem
            name="lastName"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <Input />
          </FormItem>
        </FormItem>
        {/*<FormItem*/}
        {/*  name="roles"*/}
        {/*  label={<FormattedMessage id="pages.cms.accounts.msg.titleRoles" defaultMessage="Roles" />}*/}
        {/*>*/}
        {/*  <Select*/}
        {/*    mode="tags"*/}
        {/*    style={{ width: '100%' }}*/}
        {/*    options={rolesData ? convertData(rolesData) : []}*/}
        {/*  />*/}
        {/*</FormItem>*/}
        {/*<FormItem*/}
        {/*  name="avatar"*/}
        {/*  label={<FormattedMessage id="pages.cms.accounts.msg.avatar" defaultMessage="Avatar" />}*/}
        {/*>*/}
        {/*  <UploadImage />*/}
        {/*</FormItem>*/}
        <FormItem
          name="password"
          label="Password"
          rules={[
            {
              required: showForm.action !== 'UPDATE',
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </FormItem>
        <FormItem
          name="passwordConfirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: showForm.action !== 'UPDATE',
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
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
          <Input.Password />
        </FormItem>
        <Divider />
        <Row>
          <Col span={18} offset={6}>
            <Space>
              <Button onClick={close}>
                <FormattedMessage id="common.cancel" defaultMessage="Cancel" />
              </Button>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="common.save" defaultMessage="Save" />
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    );
  }, [data]);

  return (
    <>
      <Modal
        width={800}
        destroyOnClose
        maskClosable={false}
        title={
          showForm.action === 'UPDATE' ? (
            <FormattedMessage
              id="pages.cms.accounts.form.updateAccount"
              defaultMessage="Update Account"
            />
          ) : (
            <FormattedMessage
              id="pages.cms.accounts.form.addAccount"
              defaultMessage="Add Account"
            />
          )
        }
        open={showForm.visible}
        onCancel={close}
        footer={null}
      >
        {loadingData && <Skeleton active />}
        {!loadingData && <Spin spinning={loadingSave}>{renderForm}</Spin>}
      </Modal>
    </>
  );
};

export default UpdateForm;
