import React, { useState, useCallback } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Form, { SimpleItem, GroupItem, NumericRule } from 'devextreme-react/form';
import { CheckBox } from 'devextreme-react/check-box';


const employee = {
  name: 'John Heart',
  position: 'CEO',
  officeNumber: 901,
  account: 'permanent',
};

const DevForm = () => {
  const handleSubmit = useCallback(() => {
    alert("Saved Successfully");
  }, []);

  const handleDraft = useCallback(() => {
    alert("Draft Saved");
  }, []);

  return (
    <div id="app-container">
      <Form id="form" formData={employee} labelLocation="left" showColonAfterLabel={false}>
        <GroupItem itemType="group" colSpan={3}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Outward Invoice</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleDraft} style={{ backgroundColor: "#E3F2FD", color: "#007BFF", border: "1px solid #B0C4DE", padding: "10px 20px", borderRadius: "25px", cursor: "pointer" }}>Save Draft</button>
              <button onClick={handleSubmit} style={{ backgroundColor: "#0056b3", color: "#FFF", border: "none", padding: "10px 20px", borderRadius: "25px", cursor: "pointer" }}>Save</button>
            </div>
          </div>
        </GroupItem>

        <GroupItem colCount={3}>
          <GroupItem>
            <SimpleItem dataField="name" label={{ text: "Customer" }} isRequired editorType="dxSelectBox" editorOptions={{ items: ["Quality Admin Con.", "Tech Solutions", "XYZ Pvt Ltd", "Global Services"], value: "Quality Admin Con." }} />
            <SimpleItem dataField="position" label={{ text: "Payment Mode" }} isRequired editorType="dxSelectBox" editorOptions={{ items: ["Receivable", "Payable", "Online Transfer", "Cash", "Credit Card"], value: "Receivable" }} />
            <SimpleItem dataField="officeNumber" label={{ text: "Tax Mode" }} isRequired>
              <NumericRule message="This field should contain a number" />
            </SimpleItem>
            <SimpleItem dataField="account" label={{ text: "Referrer" }} />
          </GroupItem>

          <GroupItem>
            <SimpleItem dataField="docNo" label={{ text: "Doc No." }} />
            <SimpleItem dataField="account" label={{ text: "Account" }} editorType="dxSelectBox" editorOptions={{ items: ["CUS0034 - Quality Admin", "ACC1001 - John Doe", "ACC2002 - Alpha Corp"], value: "CUS0034 - Quality Admin" }} />
            <SimpleItem dataField="credit" label={{ text: "Credit" }} />
            {/* <SimpleItem dataField="printRequired" editorType="dxCheckBox" label={{ text: "Print Required" }} /> */}
            <SimpleItem dataField="printRequired" label={{ text: "Print Required" }}>
              <CheckBox />
            </SimpleItem>

          </GroupItem>

          <GroupItem>
            <SimpleItem dataField="docNo2" label={{ text: "Doc Date" }} editorType="dxDateBox" editorOptions={{
              displayFormat: "dd/MMM/yyyy", // Format as Day/Month/Year
              type: "date", // Ensures only date selection
            }} />
            <SimpleItem dataField="taxMode2" label={{ text: "Tax Mode" }} editorType="dxSelectBox" editorOptions={{ items: ["Zero Tax", "GST 5%", "GST 12%", "VAT 10%", "Exempted"], value: "Zero Tax" }} />
            <SimpleItem dataField="referrer2" label={{ text: "Referrer" }} />
          </GroupItem>
        </GroupItem>
      </Form>
    </div>
  );
};

export default DevForm;
