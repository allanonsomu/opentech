import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Column } from '@/components/lib/column/Column';
import { DataTable } from '@/components/lib/datatable/DataTable';
import { useState, useEffect } from 'react';
import { Menubar } from '@/components/lib/menubar/menubar';
import { Dialog } from 'primereact/dialog';

export function CheckboxRowSelectionDoc(props) {
    const [issues, setIssues] = useState([]);
    const [selectedIssues, setSelectedIssues] = useState(null);
    const [rowClick] = useState(true);
    const [visible, setVisible] = useState(false);
    const [selectedIssueDescription, setSelectedIssueDescription] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/issues/fetch-issues');

                if (!response.ok) {
                    throw new Error('Failed to fetch issues');
                }

                const data = await response.json();

                setIssues(data);
            } catch (error) {
            }
        };

        fetchIssues();
    }, []);

    const menubarColumnTemplate = (rowData) => {
        const items = [
            {
                label: 'Actions',
                icon: 'pi pi-bars',
                items: [
                    {
                        label: 'View',
                        icon: 'pi pi-eye',
                        command: () => {
                            setSelectedIssueDescription(rowData.text);
                            setVisible(true);
                        }
                    },

                    {
                        label: 'Send Prompt',
                        icon: 'pi pi-send',
                        command: () => {
                            // Add your logic here
                        }
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-pen-to-square',
                        command: () => {
                            // Add your logic here
                        }
                    },
                    {
                        label: 'Done',
                        icon: 'pi pi-check',
                        command: () => {
                            // Add your logic here
                        }
                    },
                    {
                        label: 'Pending',
                        icon: 'pi pi-hourglass',
                        command: () => {
                            // Add your logic here
                        }
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-trash',
                        command: () => {
                            // Add your logic here
                        }
                    }
                ]
            }
        ];

        return <Menubar model={items} />;
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    The issues table below will display the <i>Issue Title</i>, <i>Status</i>, <i>Tracking Number</i>, <i>Date Reported</i>, <i>Complainant Name</i>, <i>Complainant Email</i>, <i>Category</i>, and <i>Consultant Assigned</i>.
                </p>
                <p>
                    The table can be <i>Scrolled left</i> to view more columns, and <i>Actions</i> for the issue raised. Currently, I have set the actions as a demo to showcase the kind of actions we can take.
                </p>
            </DocSectionText>
            <Dialog header="Issue Description" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="m-0" dangerouslySetInnerHTML={{ __html: selectedIssueDescription }} />
            </Dialog>

            <div className="card">
                <DataTable value={issues} paginator rows={5} header='Issues Table - Scroll Left for More' rowsPerPageOptions={[5, 10, 25, 50]} selectionMode={rowClick ? null : 'checkbox'} selection={selectedIssues} onSelectionChange={(e) => setSelectedIssues(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                    <Column field="id" header="# id" />
                    <Column field="complaintTitle" header="Title" />
                    <Column field="selectedCategory" header="Category" />
                    <Column field="complainantName" header="Complainant Name" />
                    <Column field="complainantEmail" header="Complainant Email" />
                    <Column field="selectedConsultant" header="Consultant Assigned" />
                    <Column field="selectedCountry" header="Contry" />
                    <Column field="status" header="Status" />
                    <Column header="Actions" body={menubarColumnTemplate} />
                    <Column field="date" header="Date Reported" />
                </DataTable>
            </div>
        </>
    );
}
