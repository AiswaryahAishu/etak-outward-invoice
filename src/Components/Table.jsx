import React, { useCallback, useState } from 'react';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';
import Tabs from 'devextreme-react/tabs';
import MultiView, { Item as MultiViewItem } from 'devextreme-react/multi-view';
import DataGrid, { Column,Editing,Scrolling,Lookup,Summary,TotalItem } from 'devextreme-react/data-grid';
import { SelectBox } from 'devextreme-react/select-box';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { NumberBox } from "devextreme-react/number-box";
import '../App.css';
import { employees, states, cities } from '../data';


const URL = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';
const REFRESH_MODES = ['full', 'reshape', 'repaint'];
const Table = () => {
  const [refreshMode, setRefreshMode] = useState('reshape');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [total, setTotal] = useState(119771.25); // Example total

  const [selectTextOnEditStart, setSelectTextOnEditStart] = useState(true);
  const [startEditAction, setStartEditAction] = useState('click');
  const onSelectTextOnEditStartChanged = useCallback((args) => {
    setSelectTextOnEditStart(args.value);
  }, []);
  const onStartEditActionChanged = useCallback((args) => {
    setStartEditAction(args.value);
  }, []);

  
  const onEditorPreparing = (e) => {
    if (e.parentType === 'dataRow' && e.dataField === 'CityID') {
      const isStateNotSet = e.row.data.StateID === undefined;
      e.editorOptions.disabled = isStateNotSet;
    }
  };
  const getFilteredCities = (options) => ({
    store: cities,
    filter: options.data ? ['StateID', '=', options.data.StateID] : null,
  });
  function setStateValue(rowData, value) {
    rowData.CityID = null;
    this.defaultSetCellValue?.(rowData, value);
  }
 

  return (
    <>
    <TabPanel>
    <TabPanelItem title="Customer Info">
      <DataGrid
      dataSource={employees}
      keyExpr="ID"
      showBorders={true}
      onEditorPreparing={onEditorPreparing}
    >
      <Editing
          mode="batch"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          selectTextOnEditStart={selectTextOnEditStart}
          startEditAction={startEditAction} />
      <Column dataField="ChartOfAccount" caption='Chart Of Account'  />
      <Column
        dataField="StateID"
        caption="Cost Center"
        setCellValue={setStateValue}
      >
        <Lookup
          dataSource={states}
          displayExpr="Name"
          valueExpr="ID"
        />
      </Column>
      <Column
        dataField="CityID"
        caption="Branch"
      >
        <Lookup
          dataSource={getFilteredCities}
          displayExpr="Name"
          valueExpr="ID"
        />
      </Column>
      <Column dataField="Amount" caption='Amount' />

      <Summary>
        <TotalItem field="Amount" summaryType="sum" valueFormat="currency" column='Amount' />
      </Summary>       

    </DataGrid>
      </TabPanelItem>
     


      <TabPanelItem title="Customer Info">
      <DataGrid
      dataSource={employees}
      keyExpr="ID"
      showBorders={true}
      onEditorPreparing={onEditorPreparing}
    >
      <Editing
          mode="batch"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          selectTextOnEditStart={selectTextOnEditStart}
          startEditAction={startEditAction} />
      <Column dataField="ChartOfAccount" caption='Chart Of Account'  />
      <Column
        dataField="StateID"
        caption="Cost Center"
        setCellValue={setStateValue}
      >
        <Lookup
          dataSource={states}
          displayExpr="Name"
          valueExpr="ID"
        />
      </Column>
      <Column
        dataField="CityID"
        caption="Branch"
      >
        <Lookup
          dataSource={getFilteredCities}
          displayExpr="Name"
          valueExpr="ID"
        />
      </Column>
      <Column dataField="Amount" />

      <Summary>
        <TotalItem field="Amount" summaryType="sum" valueFormat="currency" column='Amount' />
      </Summary>
    </DataGrid>
      </TabPanelItem>
    </TabPanel>


</>
  );
};

export default Table;
