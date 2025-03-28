import React, { useCallback, useState } from 'react';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';
import DataGrid, { Column, Editing, Lookup, Summary, TotalItem } from 'devextreme-react/data-grid';
import Form, { GroupItem, SimpleItem, NumericRule, EmailRule } from 'devextreme-react/form';
import { employees, states, cities } from '../data';
import '../App.css';
import ProgressBar from './ProgressBar';

const employee = {
    name: 'John Heart',
    position: 'CEO',
    hireDate: new Date(2012, 4, 13),
    officeNumber: 901,
    phone: '+1(213) 555-9392',
    skype: 'jheart_DX_skype',
    email: 'jheart@dx-email.com',
    notes: 'John has been in the Audio/Video industry since 1990.'
};

class Item {
    ID: number;
    Item: string;
    Quantity: number;
    Price: number;
    Total: number;
  
    constructor(ID: number, Item: string, Quantity: number, Price: number) {
        this.ID = ID;
        this.Item = Item;
        this.Quantity = Quantity;
        this.Price = Price;
        this.Total = Quantity * Price;
    }
}
const steps = [
  { label: "S", color: "#ccc", active: false },
  { label: "DEO", color: "green", active: true },
  { label: "SE", color: "orange", active: true },
  { label: "SM", color: "red", active: true },
  
];

const Table: React.FC = () => {
    const [randomOption, setRandomOption] = useState(0);
const [randomValue, setRandomValue] = useState(0);

    const [selectTextOnEditStart, setSelectTextOnEditStart] = useState<boolean>(true);
    const [startEditAction, setStartEditAction] = useState<'click' | 'dblClick'>('click');
    const [isFormReadOnly, setIsFormReadOnly] = useState(false);
    const [items, setItems] = useState<Item[]>([
        new Item(1, 'Printer', 1, 25000),
        new Item(2, 'Speaker', 2, 5000),
        new Item(3, 'TV', 2, 30000),
        new Item(4, 'Dish Washer', 2, 15000),
    ]);
    const [discountType, setDiscountType] = useState("Flat");
    const [subTotal, setSubTotal] = useState(0);
  const [rounding, setRounding] = useState(0);
  const [discount, setDiscount] = useState({ amount: 0, percentage: 0 });

   // Extract total from Amount column when grid updates
   const onGridContentReady = (e) => {
    const totalAmount = e.component.getTotalSummaryValue("Amount") || 0;
    setSubTotal(totalAmount);
  };

  const calculateFinalAmount = () => {
    let discountAmount =
      discount.percentage > 0
        ? (subTotal * discount.percentage) / 100
        : discount.amount;

    return (subTotal - discountAmount + rounding).toFixed(2);
  };

    const onRowInserting = (e: any) => {
        const newItem = new Item(items.length + 1, e.data.Item, e.data.Quantity, e.data.Price);
        setItems([...items, newItem]);
    };

    const onRowUpdating = (e: any) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.ID === e.key
                    ? new Item(
                        item.ID,
                        e.newData.Item || item.Item,
                        e.newData.Quantity || item.Quantity,
                        e.newData.Price || item.Price
                    )
                    : item
            )
        );
    };

    const onRowRemoving = (e: any) => {
        setItems(items.filter((item) => item.ID !== e.key));
    };

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => alert("Submitted"), 1000);
    }, []);

    const onEditorPreparing = (e: any) => {
        if (e.parentType === 'dataRow' && e.dataField === 'CityID') {
            e.editorOptions.disabled = e.row.data.StateID === undefined;
        }
    };

    const getFilteredCities = (options: any) => ({
        store: cities,
        filter: options.data ? ['StateID', '=', options.data.StateID] : null,
    });

    return (
        <TabPanel>
             <TabPanelItem title="Invoice Info">
      <DataGrid
        dataSource={employees} // Assuming this comes from an API or state
        keyExpr="ID"
        showBorders
        onContentReady={onGridContentReady} // This updates the subtotal dynamically
      >
        <Editing mode="batch" allowUpdating allowAdding allowDeleting />
        <Column dataField="ChartOfAccount" caption="Chart Of Account" />
        <Column dataField="StateID" caption="Cost Center">
          <Lookup dataSource={states} displayExpr="Name" valueExpr="ID" />
        </Column>
        <Column dataField="CityID" caption="Branch">
          <Lookup dataSource={getFilteredCities} displayExpr="Name" valueExpr="ID" />
        </Column>
        <Column dataField="Amount" caption="Amount" />
        <Summary>
          <TotalItem summaryType="sum" valueFormat="currency" column="Amount" />
        </Summary>
      </DataGrid>

      <div className="billing-container">
        {/* Discount Section */}
        <div className="discount-section">
  <label>Discount</label>
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

    {/* First Row: Existing Discount Inputs */}
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="number"
        placeholder="₹"
        value={discount.amount}
        onChange={(e) =>
          setDiscount({ amount: parseFloat(e.target.value) || 0, percentage: 0 })
        }
      />
      <input
        type="number"
        placeholder="%"
        value={discount.percentage}
        onChange={(e) =>
          setDiscount({ percentage: parseFloat(e.target.value) || 0, amount: 0 })
        }
      />
    </div>

    {/* Second Row: Dropdown & Input Box Below */}
    <div style={{ display: "flex", gap: "10px" }}>
      <select
        value={randomOption}
        onChange={(e) => setRandomOption(e.target.value)}
      >
        <option value="Option 1">0</option>
        <option value="Option 2">1</option>
        <option value="Option 3">2</option>
        <option value="Option 3">3</option>
      </select>
      <input
        type="number"
        placeholder="Enter value"
        value={randomValue}
        onChange={(e) => setRandomValue(parseFloat(e.target.value) || 0)}
      />
    </div>

  </div>
</div>


        {/* Summary Section */}
        <div className="summary-container">
          <div className="summary-item">
            <label>Sub Total</label>
            <input type="text" readOnly value={subTotal.toFixed(2)} />
          </div>

          <div className="summary-item">
            <label>Rounding</label>
            <input
              type="number"
              value={rounding}
              onChange={(e) => setRounding(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="summary-item amount">
            <label>Amount</label>
            <input type="text" readOnly value={calculateFinalAmount()} />
          </div>
        </div>
      </div>
      <ProgressBar steps={steps}/>
    </TabPanelItem>
            <TabPanelItem title="Customer Info">
                <form action="/employee-page" onSubmit={handleSubmit}>
                    <Form id="form" formData={employee} readOnly={isFormReadOnly} labelLocation="top" showColonAfterLabel={false}>
                        <GroupItem colCount={2}>
                            <GroupItem caption="Employee">
                                <SimpleItem dataField="name" isRequired />
                                <SimpleItem dataField="position" />
                                <SimpleItem dataField="hireDate" />
                                <SimpleItem dataField="officeNumber">
                                    <NumericRule message="This field should contain a number" />
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem caption="Personal Information">
                                <SimpleItem dataField="phone" />
                                <SimpleItem dataField="skype" />
                                <SimpleItem dataField="email">
                                    <EmailRule message="This is not a valid Email" />
                                </SimpleItem>
                            </GroupItem>
                        </GroupItem>
                    </Form>
                </form>
            </TabPanelItem>

            <TabPanelItem title="Print Info">
                <DataGrid
                    dataSource={items}
                    keyExpr="ID"
                    showBorders
                    repaintChangesOnly={true}
                    onRowInserting={onRowInserting}
                    onRowUpdating={onRowUpdating}
                    onRowRemoving={onRowRemoving}
                    onSaved={() => setItems([...items])}
                >
                    <Editing mode="batch" allowUpdating allowAdding allowDeleting />
                    <Column dataField="Item" caption="Items" />
                    <Column dataField="Quantity" caption="Quantity" dataType="number" />
                    <Column dataField="Price" caption="Price" dataType="number" />
                    <Column dataField="Total" caption="Total" dataType="number" allowEditing={false} />
                    <Summary>
                        <TotalItem summaryType="sum" valueFormat="currency" column="Total" />
                    </Summary>
                </DataGrid>
            </TabPanelItem>
        
        </TabPanel>
    );
};

export default Table; 