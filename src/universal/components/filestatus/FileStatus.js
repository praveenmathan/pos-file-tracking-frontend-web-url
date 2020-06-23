import * as React from 'react';
import FileSearch from './file-search/fileSearch';

/* eslint-disable */
export default function FileStatus() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <FileSearch />
                </div>
            </div>
            <div className="divider"></div>
            <div className="row">
                <div className="col-md-12">
                    {/*<FileChart />*/}
                </div>
            </div>
        </div>
    )
}
