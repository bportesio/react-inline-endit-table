/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, {Fragment} from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row, Table } from '@zendeskgarden/react-tables';

const EditableInput = ({data}) => {
    const [stateCell, setStateCell] = React.useState(data)
    return(
        <Field>
            <Input value={stateCell} onChange={(e)=> setStateCell(e.target.value)} />
        </Field>
    )
}

const CellEditable = ({data, inEdition}) => {

    return(
        <Cell>
            {!inEdition && `${data}`}
            {inEdition &&
                <EditableInput data={data}/>
            }
        </Cell>
    )
}

const RowEditable = ({data, changeData}) => {
  const [toggleEdit, setToggleEdit] = React.useState(false)

  return (
      <Row>
          {Object.keys(data).map(k =>
            <CellEditable data={data[k]} inEdition={toggleEdit}/>
          )}
        <Cell>
          {!toggleEdit
              ? <Button onClick={()=> setToggleEdit(true)}>Edit</Button>
              :
              <div>
                <Button>Save</Button>
                <Button onClick={()=> setToggleEdit(false)}>Cancel</Button>
              </div>
          }

        </Cell>
      </Row>
  )
}

const App = () => {

  const rowData = Array.from(Array(100)).map((row, index) => ({
    id:index,
    fruit: `Fruit #${index}`,
    sun: 'Full sun',
    soil: 'Well draining'
  }));

  const [allData, setAllData] = React.useState(rowData)


    return (
      <div style={{ overflowX: 'auto' }}>
        <Table style={{ minWidth: 500 }}>
          <Head>
            <HeaderRow>
                {Object.keys(allData[0]).map(k => <HeaderCell>{k}</HeaderCell>)}
            </HeaderRow>
          </Head>
          <Body>
            {rowData.map(e=>{
              return <RowEditable data={e}/>
            })}
          </Body>
        </Table>
    </div>
    )

};

export default App;
