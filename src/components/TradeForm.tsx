import { useQuery, useSuspense } from '@data-client/react';
import { Descriptions, Form, InputNumber, Select } from 'antd';
import React, { memo, useState } from 'react';

import { CurrencyResource } from '@/resources/Currency';
import { Holding } from '@/resources/Holding';

import { Price } from './CurrencyList/AssetPrice';

const { Option } = Select;

const TradeForm: React.FC<{
  onFinish: ((values: any) => void) | undefined;
}> = ({ onFinish }) => {
  const [id, setId] = useState('');
  const currentAmount = useQuery(Holding, { id })?.amount ?? 0;

  return (
    <Form name="trade_form" layout="vertical" onFinish={onFinish}>
      <AssetSelect onChange={setId} />
      <Form.Item
        name="amount"
        label="Amount of Coins"
        rules={[
          { required: true, message: 'Please input the amount of coins!' },
        ]}
      >
        <InputNumber min={-currentAmount} defaultValue={1} />
      </Form.Item>
      <TradeInfo id={id} />
    </Form>
  );
};
export default memo(TradeForm);

const AssetSelect: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const currencies = useSuspense(CurrencyResource.getList);
  return (
    <Form.Item
      // todo: defaultValue of current page
      name="asset"
      label="Select Asset"
      rules={[{ required: true, message: 'Please select an asset!' }]}
    >
      <Select placeholder="Select an asset" showSearch onChange={onChange}>
        {currencies.map(currency => (
          <Option key={currency.id} value={currency.id}>
            {currency.name} ({currency.display_name})
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

const TradeInfo: React.FC<{ id: string }> = ({ id }) => {
  const holding = useQuery(Holding, { id });
  return (
    <Descriptions>
      <Descriptions.Item label="Holdings">
        {holding?.amount ?? 0}
      </Descriptions.Item>
      <Descriptions.Item label="Cost">
        <Price product_id={`${id}-USD`} multiple={holding?.amount ?? 1} />
      </Descriptions.Item>
    </Descriptions>
  );
};
