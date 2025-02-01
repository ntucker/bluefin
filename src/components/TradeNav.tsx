import { AsyncBoundary, useController } from '@data-client/react';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import { memo, useState, useCallback } from 'react';

import { HoldingResource } from '@/resources/Holding';

import TradeForm from './TradeForm';

const TradeNav: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctrl = useController();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTrade = useCallback(
    async (values: any) => {
      await ctrl.fetch(HoldingResource.trade, values.asset, values.amount);
      handleOk();
    },
    [ctrl],
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Trade
      </Button>
      <Modal
        title="Trade"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            form="trade_form"
            type="primary"
            key="submit"
            htmlType="submit"
          >
            Trade
          </Button>,
        ]}
      >
        <AsyncBoundary>
          <TradeForm onFinish={handleTrade} />
        </AsyncBoundary>
      </Modal>
    </>
  );
};

export default memo(TradeNav);
