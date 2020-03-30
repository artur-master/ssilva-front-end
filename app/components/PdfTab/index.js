/**
 *
 * PdfTab
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf'

const PdfTab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="pdf-tab">
      <ul>
        {tabs.map((tab, index) => (
          /* eslint-disable-next-line */
          <li key={index} className={activeTab === index ? 'active' : ''}>
            <a onClick={evt => {
              evt.preventDefault();
              setActiveTab(index);
            }}
            >
              <b>{tab.label}</b>
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab, index) => (
          /* eslint-disable-next-line */
          <div id={index} className={activeTab === index ? "tab-pane active" : 'tab-pane'}>
            {tab.content.map((content, idx) => {
              if (content.url && content.url !== '')
                return (
                  <>
                  <p>{content.title}</p>
                  <Document file={{ url: content.url }}
                    onLoadSuccess={console.log('success')}
                  >
                    <Page width={900} pageNumber={1} />
                  </Document>
                  </>);
              else return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

PdfTab.propTypes = {
  tabs: PropTypes.array,
};
export default PdfTab;
