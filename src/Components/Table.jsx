import React, { useCallback, useState } from 'react';
import {
  DataGrid,
  Column,
  Editing,
  Scrolling,
  Lookup,
  Summary,
  TotalItem,
} from 'devextreme-react/data-grid';
import { SelectBox } from 'devextreme-react/select-box';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { NumberBox } from "devextreme-react/number-box";
import '../App.css';

const URL = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';
const REFRESH_MODES = ['full', 'reshape', 'repaint'];

const Table = () => {
  const [refreshMode, setRefreshMode] = useState('reshape');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [total, setTotal] = useState(119771.25); // Example total


  const sendRequest = useCallback(async (url, method = 'GET', data = {}) => {
    const request = { method, credentials: 'include' };
    if (['DELETE', 'POST', 'PUT'].includes(method)) {
      request.body = Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
      request.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
    }
    const response = await fetch(url, request);
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const result = isJson ? await response.json() : {};
    if (!response.ok) throw result.Message;
    return method === 'GET' ? result.data : {};
  }, []);

  const ordersData = new CustomStore({
    key: 'OrderID',
    load: () => sendRequest(`${URL}/Orders`),
    insert: (values) => sendRequest(`${URL}/InsertOrder`, 'POST', { values: JSON.stringify(values) }),
    update: (key, values) => sendRequest(`${URL}/UpdateOrder`, 'PUT', { key, values: JSON.stringify(values) }),
    remove: (key) => sendRequest(`${URL}/DeleteOrder`, 'DELETE', { key }),
  });

  const customersData = new CustomStore({ key: 'Value', loadMode: 'raw', load: () => sendRequest(`${URL}/CustomersLookup`) });
  const shippersData = new CustomStore({ key: 'Value', loadMode: 'raw', load: () => sendRequest(`${URL}/ShippersLookup`) });

  return (
    <>
      <DataGrid id="grid" showBorders dataSource={ordersData} repaintChangesOnly>
        <Editing refreshMode={refreshMode} mode="cell" allowAdding allowDeleting allowUpdating />
        <Scrolling mode="virtual" />

        <Column dataField="CustomerID" caption="Customer">
          <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" />
        </Column>

        <Column dataField="OrderDate" dataType="date" />
        <Column dataField="Freight" />
        <Column dataField="ShipCountry" />
        
        <Column dataField="ShipVia" caption="Shipping Company" dataType="number">
          <Lookup dataSource={shippersData} valueExpr="Value" displayExpr="Text" />
        </Column>

        <Summary>
          <TotalItem column="CustomerID" summaryType="count" />
          <TotalItem column="Freight" summaryType="sum" valueFormat="#0.00" />
        </Summary>
      </DataGrid>
      <div className="summary-container">
  {/* Centered Discount Section */}
  <div className="discount-section">
    <span>Discount</span>
    <NumberBox
      value={discountAmount}
      onValueChanged={(e) => setDiscountAmount(e.value)}
      format="₹ #0.00"
      width={80}
    />
    <NumberBox
      value={discountPercentage}
      onValueChanged={(e) => setDiscountPercentage(e.value)}
      format="#0.00 %"
      width={60}
    />
  </div>

  {/* Total Section on the Right */}
  <div className="total-section">
    <span className="total-label">Total</span>
    <NumberBox
      value={total}
      readOnly
      format="#,##0.00"
      width={120}
      className="total-amount"
    />
  </div>
</div>

    </>
  );
};

export default Table;