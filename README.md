<h3 align="center">
  Lupa Table
</h3>

<p align="center">
  Use Lupa datasets and display as a table
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/lupa-table"><img src="https://img.shields.io/npm/v/lupa-table?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/lupa-table"><img src="https://img.shields.io/npm/dm/lupa-table?style=flat-square"></a>
  <a href="https://travis-ci.com/mondobrain/lupa-table"><img src="https://img.shields.io/travis/com/mondobrain/lupa-table/master?style=flat-square"></a>
</p>

## Installation

`Lupa` is on NPM so install using your preferred JS package manager.

```bash
yarn add lupa-table
npm install lupa-table
```

## Usage

Anywhere underneath a Lupa `<Dataset>` component you can use the `<LupaTable>` component.

```jsx
import React from 'react';
import { MockDataset } from '@lupa/mock'; // This can be any lupa provider
import { LupaTable } from 'lupa-table';

export default function App() {
  return (
    <MockDataset data={[...]}>
      <LupaTable />
    </MockDataset>
  )
}
```
