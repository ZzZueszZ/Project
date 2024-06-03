import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import type { TableItem } from './data.d';
import { query, remove } from './service';
import { FormattedMessage, history } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import type { ShowForm } from './data.d';
import useQuery from '@/use_query';
import { useAccess } from '@@/plugin-access';

const AccountsTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const access = useAccess();

  const currentPage = Number(useQuery('page', 1));
  const pageSize = Number(useQuery('pageSize', 20));

  useEffect(() => {
    if (actionRef) actionRef.current?.reload();
  }, [history.location.search]);

  const [visibleForm, setVisibleForm] = useState<ShowForm>({
    action: 'ADD',
    visible: false,
  });

  const { loading: loadingRemove, run: removeRun } = useRequest(remove, {
    manual: true,
    onSuccess: () => {
      actionRef.current?.reload();
    },
  });

  const columns: ProColumns<TableItem>[] = [
    {
      width: 40,
      renderText: (text, record, index) => (currentPage - 1) * pageSize + 1 + index,
      search: false
    },
    {
      title: <FormattedMessage id="pages.cms.accounts.msg.titleAction" defaultMessage="Action" />,
      valueType: 'option',
      width: 140,
      hideInTable: !access.allowWrite(window.location.pathname),
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setVisibleForm({
                action: 'UPDATE',
                visible: true,
                data: record,
              });
            }}
          >
            <FormattedMessage id="pages.cms.accounts.msg.edit" defaultMessage="Edit" />
          </Button>

          <Popconfirm
            title={
              <FormattedMessage
                id="pages.purchases.components.SendEmailArrived.title"
                defaultMessage="Do You want to delete this row?"
              />
            }
            onConfirm={() =>
            {
              console.log('record', record)
              removeRun({
                id: record.userId,
              })
            }
            }
            okText={<FormattedMessage id="common.delete" defaultMessage="Delete" />}
            cancelText={<FormattedMessage id="common.cancel" defaultMessage="Cancel" />}
          >
            <Button type="primary" loading={loadingRemove} danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
      search: false
    },
    // {
    //   title: <FormattedMessage id="pages.cms.accounts.msg.titleAvatar" defaultMessage="Avatar" />,
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   valueType: 'avatar',
    //   width: 150,
    //   render: (dom, record) => (
    //     <Space>
    //       <span>
    //         <img src={`${record.avatar || defaultImage}?type=resize&width=100&height=100`} />
    //       </span>
    //     </Space>
    //   ),
    // },
    {
      title: (
        <FormattedMessage id="pages.cms.accounts.msg.titleUserName" defaultMessage="User Name" />
      ),
      dataIndex: 'userName',
    },
    {
      title: <FormattedMessage id="pages.cms.accounts.msg.titleName" defaultMessage="Name" />,
      dataIndex: 'firstName',
      render: (dom, entity) => `${entity.firstName} ${entity.lastName}`,
      search: false
    },
    {
      title: <FormattedMessage id="pages.cms.accounts.msg.titleEmail" defaultMessage="Email" />,
      dataIndex: 'email',
    },
    {
      title: <FormattedMessage id="pages.cms.accounts.msg.titleRoles" defaultMessage="Roles" />,
      dataIndex: 'roles',
      render: (dom, record) =>
        record.roles && record.roles.length > 0 ? record.roles.join(', ') : '-',
      search: false
    },
    {
      title: (
        <FormattedMessage
          id="pages.cms.accounts.msg.titleLastAccess"
          defaultMessage="Last access"
        />
      ),
      dataIndex: 'lastConnect',
      search: false
    },
    {
      title: <FormattedMessage id="pages.cms.accounts.msg.titleStatus" defaultMessage="Status" />,
      dataIndex: 'status',
      render: (_, record) =>
        <Space>
          {record.status === 'LOCKED' && <Tag color='error'>
            {record.status}
          </Tag>}
          {record.status === 'ACTIVE' && <Tag color='success'>
            {record.status}
          </Tag>}
          {record.status === 'EXPIRED' && <Tag color='orange'>
            {record.status}
          </Tag>}
        </Space>,
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        // fieldNames: {
        //   value: 'status',
        // },
      },
      initialValue: ['ACTIVE', 'LOCKED', 'EXPIRED'],
      valueEnum: {
        ACTIVE: {text: 'ACTIVE', status: 'ACTIVE'},
        LOCKED: {text: 'LOCKED', status: 'LOCKED'},
        EXPIRED: {text: 'EXPIRED', status: 'EXPIRED'}
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableItem>
        search={{
          searchText: 'Search',
          defaultCollapsed: false,
          span: 12,
          labelWidth: 150,
        }}
        headerTitle={
          <FormattedMessage
            id="pages.cms.accounts.msg.tableTitle"
            defaultMessage="User management"
          />
        }
        actionRef={actionRef}
        rowKey="userId"
        toolBarRender={() => [
          access.allowWrite(window.location.pathname) && (
            <Button
              type="primary"
              onClick={() =>
                setVisibleForm({
                  action: 'ADD',
                  visible: true,
                })
              }
            >
              <PlusOutlined /> <FormattedMessage id="common.msg.add" defaultMessage="Add" />
            </Button>
          ),
        ]}
        request={(params, sorter, filter) =>
          query({ ...params, sorter, filter })
        }
        columns={columns}
      />
      {access.allowWrite(window.location.pathname) && <UpdateForm
        showForm={visibleForm}
        onFinish={() => {
          actionRef.current?.reload();
          setVisibleForm({
            action: 'ADD',
            visible: false,
          });
        }}
      />}

    </PageContainer>
  );
};

export default AccountsTable;
