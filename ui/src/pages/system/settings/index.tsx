import React, {useMemo} from 'react';
import {Skeleton, Tabs} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import SettingForm from './components/SettingForm';
import {Card} from 'antd';
import {useRequest} from "@@/plugin-request/request";
import {getSettingGroups} from "./service";
import {SettingGroup} from "./data";
import {history} from "@@/core/history";

// interface PathParams {
//   tab: string;
// }

interface Props {
  match: any;
}

const {TabPane} = Tabs;

const TabInfo = (props: Props) => {

  const {
    data: settingsGroups,
    loading: loadingSettingsGroups
  } = useRequest(() => getSettingGroups(), {formatResult: (res: { list: SettingGroup[] }) => res})

  const renderTabPanel = useMemo(() => settingsGroups && settingsGroups.list.map(settings =>
    <TabPane tab={settings.name} key={settings.code}>
      {
        settings.code && <SettingForm groupCode={settings.code}
        />
      }
    </TabPane>), [settingsGroups])
  return loadingSettingsGroups ? <Skeleton active/> : (
    <PageContainer>
      <Card>
        <Tabs type="card"
              defaultActiveKey={props.match?.params?.tab || 'COMPANY-INFO'}
              onChange={(activeKey) => history.push(`/settings/${activeKey}`)}
        >
          {renderTabPanel}
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default TabInfo;
