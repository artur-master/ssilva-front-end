/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Form as ExForm, Field as ExField, Label, FormGroup } from 'components/ExForm';

function Notary() {
	const step = 7;
	return (
		<ExForm
			// initialValues={initialValues}
			onSubmit={values => console.log(values)}
		>
			{form => (
				<Box>
					<BoxHeader>
						<b>NOTARÍA</b>
					</BoxHeader>
					<BoxContent className="p-3">
						{step < 4 && (
							<Alert type="warning">
								Debes chequear el proceso de firma.
							</Alert>
						)}
						<div className="list-continue-line mt-4">
							<ol>
								<li className={(step == 1) ? "active" : ""}>
									<span className={`number ${step > 1 ? "success" : ""}`}>
										{(step > 1) ? (<i className="icon icon-check" />) : "01"}
									</span>
									<div className="content ml-3 flex-grow-1">
										<div className="d-flex align-items-center mr-2">
											{(step < 2) && (
												<ExField
													type="checkbox"
													name="check1"
												/>
											)}
											<span className="font-14-rem">
												<span className="color-warning">(text contado)</span>
												<b>Borrador de Escritura entregada Escrituración</b>
												<span className="color-warning">(text crédito)</span>
												<b>Borrador de Escritura entregada a Notaría por Banco</b>
											</span>
										</div>
										{(step == 1) && (
											<div className="mt-3 d-flex justify-content-end">
												<Button>Guardar</Button>
												<Button className="m-btn-white">Cancelar</Button>
											</div>
										)}
									</div>
								</li>

								<li className={(step == 2) ? "active" : ""}>
									<span className={`number ${step > 2 ? "success" : "mt-2"}`}>
										{(step > 2) ? <i className="icon icon-check" /> : "02"}
									</span>
									<div className="content ml-3 flex-grow-1">
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												{(step < 3) && (
													<ExField
														type="checkbox"
														name="check1"
														readOnly={step < 2}
													/>
												)}
												<span className={`font-14-rem ${step < 2 ? "color-white-gray" : ""}`}>
													Aviso a Comprador para Firmar
												</span>
											</div>
											<div className="d-flex align-items-center">
												<span className={`font-14-rem ${step < 2 ? "color-white-gray" : ""}`}>
													<em>Ingresa la fecha acordada.</em>
												</span>
												{step < 3 ?
													(<ExField
														type="datepicker"
														name="date"
														className="ml-3"
													// readOnly={step < 2}
													/>) :
													(<span className="font-14-rem ml-3">06 ene. 2020</span>)
												}
											</div>
										</div>
										{(step == 2) && (
											<div className="mt-3 d-flex justify-content-end">
												<Button>Guardar</Button>
												<Button className="m-btn-white">Cancelar</Button>
											</div>
										)}
									</div>
								</li>

								<li className={(step == 3) ? "active" : ""}>
									<span className={`number ${step > 3 ? "success" : ""}`}>
										{(step > 3) ? <i className="icon icon-check" /> : "03"}
									</span>
									<div className="content ml-3 flex-grow-1">
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center mr-2">
												{(step < 4) && (
													<ExField
														type="checkbox"
														name="check1"
														readOnly={step < 3}
													/>
												)}
												<span className={`font-14-rem ${step < 3 ? "color-white-gray" : ""}`}>
													Aviso a Inmobiliaria por saldos a pagar
												</span>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6 d-flex align-items-center">
												<span className={`font-14-rem mr-3 ${step < 3 ? "color-white-gray" : ""}`}>
													Saldo Cuotas por Pagar
												</span>
												{step < 4 ?
													(<ExField
														type="number"
														name="uf"
														maskOptions={{ prefix: 'UF' }}
														readOnly={step < 3}
													/>) :
													(<span className="font-14-rem color-regular ml-3">UF 500.000</span>)
												}
											</div>
											<div className="col-md-6 d-flex align-items-center justify-content-end">
												<span className={`font-14-rem mr-3 ${step < 3 ? "color-white-gray" : ""}`}>
													Saldo Fondos por Reglamentos
												</span>
												{step < 4 ?
													(<ExField
														type="number"
														name="uf"
														maskOptions={{ prefix: '$' }}
														readOnly={step < 3}
													/>) :
													(<span className="font-14-rem color-regular ml-3">$ 500.000</span>)
												}
											</div>
										</div>
										{(step == 3) && (
											<div className="mt-3 d-flex justify-content-end">
												<Button>Guardar</Button>
												<Button className="m-btn-white">Cancelar</Button>
											</div>
										)}
									</div>
								</li>
							</ol>
						</div>
						{step > 3 && (
							<>
								<Alert type="warning">
									Debes ingresar la forma de pago de los saldos y la fecha en que se firmó la Escritura.
								</Alert>
								<div className="mt-4 pb-3 border-bottom">
									<span className="font-14-rem color-regular d-block">
										<b>FIRMA DE ESCRITURA</b>
									</span>
									<div className="mt-3 d-flex align-items-center">
										<span className="font-14-rem color-regular mr-3">
											<b>Fecha de la Firma</b>
										</span>
										<ExField
											type="datePicker"
											name="aaa"
										/>
									</div>
								</div>

								<div className="mt-3">
									<div className="d-flex align-items-center">
										<span className="font-14-rem color-regular mr-3">
											<b>Forma de Pago Saldos</b>
										</span>
										<ExField
											type="radioGroup"
											required
											name="PromesaInstructions"
											options={[
												{ label: 'Cheque', value: '0' },
												{ label: 'Vale Vista', value: '1' },
												{ label: 'Instrucciones', value: '2' },
												{ label: 'Depósito a Plazo', value: '3' },
												{ label: 'Tarjeta de Crédito', value: '4' },
												{ label: 'Transferencia', value: '5' },
											]}
											itemClassName="pr-3"
										/>
									</div>
									{(step == 5) ?
										<div className="row mt-4">
											<div className="col-md-6 d-flex align-items-center mb-3 justify-content-between">
												<span className="font-14-rem color-regular mr-3 no-whitespace">
													<b>Número Instrucción</b>
												</span>
												<ExField name="Cheque" className="w-100" />
											</div>
											<div className="col-md-6 d-flex align-items-center mb-3 justify-content-between">
												<span className="font-14-rem color-regular mr-3 no-whitespace">
													<b>Notaría</b>
												</span>
												<ExField name="Cheque" className="w-100" />
											</div>
											<div className="col-md-6 d-flex align-items-center mb-3 justify-content-between">
												<span className="font-14-rem color-regular mr-3">
													<b>Monto</b>
												</span>
												<ExField
													type="number"
													name="uf"
													maskOptions={{ prefix: '$' }}
												// readOnly={step < 3}
												// style={{width:"7.5em"}}
												/>
											</div>
											<div className="col-md-6 d-flex align-items-center mb-3 justify-content-between">
												<span className="font-14-rem color-regular mr-3 no-whitespace">
													<b>Documento Escaneado</b>
												</span>
												<ExField
													type="file"
													name="PhysicalMask"
													placeholder="Examinar..."
												// style={{width:"12em", height:"2.2em"}}
												/>
											</div>
										</div> :
										<div className="row mt-4">
											<div className="col-md-6 d-flex align-items-center mb-3">
												<span className="font-14-rem color-regular mr-3 no-whitespace">
													<b>Número de Cheque</b>
												</span>
												<ExField name="Cheque" className="w-100" />
											</div>
											<div className="col-md-6 d-flex mb-3">
												<div className="row d-flex align-items-center">
													<div className="col-md-6 d-flex align-items-center justify-content-end">
														<span className="font-14-rem color-regular mr-3">
															<b>Valor</b>
														</span>
														<ExField
															type="number"
															name="uf"
															maskOptions={{ prefix: '$' }}
															// readOnly={step < 3}
															style={{ width: "7.5em" }}
														/>
													</div>
													<div className="col-md-6 d-flex align-items-center">
														<span className="font-14-rem color-regular no-whitespace mr-3">
															<b>Fecha de Pago</b>
														</span>
														<ExField
															type="datepicker"
															name="date"
														// readOnly={step < 2}
														/>
													</div>
												</div>
											</div>
											<div className="col-md-6 d-flex align-items-center mb-3">
												<span className="font-14-rem color-regular mr-3 no-whitespace">
													<b>Número de Cheque</b>
												</span>
												<ExField
													type="file"
													name="PhysicalMask"
													placeholder="Examinar..."
												// style={{width:"12em", height:"2.2em"}}
												/>
											</div>
										</div>
									}

									<Alert type="warning">
										Debes ingresar el número y fecha de repertorio. Desde esa fecha comienzan los 60 días para el cierre de copias.
									</Alert>
									<Alert type="warning">
										Debes gestionar el proceso de Repertorio.
										<span className="color-warning"> Si no se completa dentro de 60 días. Debes comenzar desde Cero.</span>
									</Alert>

									<div className="mt-3">
										<span className="font-14-rem color-regular">
											<b>REPERTORIO</b>
										</span>
										<div className="row mt-3">
											<div className="col-md-6 d-flex align-items-center mb-3">
												<span className="font-14-rem color-regular mr-4">
													<b>Número de Repertorio</b>
												</span>
												<ExField name="text" />
											</div>
											<div className="col-md-6 d-flex align-items-center mb-3">
												<span className="font-14-rem color-regular mr-4">
													<b>Fecha de Inicio</b>
												</span>
												<ExField
													type="datepicker"
													name="date"
													className="ml-3"
												// readOnly={step < 2}
												/>
											</div>
										</div>
									</div>

									<div className="list-continue-line line-gray mt-4">
										<ol>
											<li>
												<span className="number time success">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem">Tiempo Restante: 59d : 13h : 21m</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-md-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-regular">
																<b>Facturación Inmobiliaria</b>
															</span>
														</div>
														<div>
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la Factura.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
													<div className="mt-3 d-flex justify-content-end">
														<Button>Guardar</Button>
														<Button className="m-btn-white">Cancelar</Button>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="a" />
															<span className="font-14-rem color-white-gray">OK Inmobiliaria para Firmar</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="a" />
															<span className="font-14-rem color-white-gray">OK Firma Notaría</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="datepicker" name="CheckArt150"/>
															<span className="font-14-rem color-white-gray">OK Firma Escritura de Compensación</span>
															<span className="font-14-rem color-white-gray ml-2">
																<em>Si es Necesario.</em>
															</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="datepicker" name="CheckArt150"/>
															<span className="font-14-rem color-white-gray">OK Firma Finiquito</span>
															<span className="font-14-rem color-white-gray ml-2">
																<em>Si es Necesario.</em>
															</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Firma Pagaré</span>
															<span className="font-14-rem color-white-gray ml-2">
																<em>Si es Necesario.</em>
															</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150"/>
															<span className="font-14-rem color-white-gray">OK Alzamiento de Hipoteca</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150"/>
															<span className="font-14-rem color-white-gray">OK Ingreso a Conservador de Bienes Raíces</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la carátula de inscripción.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK envío de copias Ecrituras, Dominios, Cert. de Hipotecas y Gravámenes al Comprador. </span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150"/>
															<span className="font-14-rem color-white-gray">OK envío de copias Ecrituras, Dominios, Cert. de Hipotecas y Gravámenes a Inmobiliaria.</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150" />
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Comprobante de Escritura o Liquidación de Pago.</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa el Comprobante.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center">
														<span className="font-14-rem color-white-gray">¿Existe Subsidio?</span>
														<div className="d-flex align-items-center ml-3">
															<ExField
																type="radios"
																required
																name="PromesaInstructions"
																options={[
																	{ label: 'SI', value: '1' },
																	{ label: 'NO', value: '0' },
																]}
																itemClassName="pr-3"
															/>
														</div>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Pago Subsidio</span>
															<span className="font-14-rem color-white-gray ml-2">
																<em>Sólo si existe Subsidio.</em>
															</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa el Comprobante.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Pago Ahorro a Inmobiliaria</span>
															<span className="font-14-rem color-white-gray ml-2">
																<em>Sólo si existe Subsidio.</em>
															</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa el Comprobante.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Recordar a Inmobiliaria Pagos Pendientes</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa el Comprobante.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Devolución Garantía a Comprador.</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Entrega de la Propiedad.</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa la fecha.</em>
															</span>
															<ExField type="datepicker" name="CheckArt150"/>
														</div>
													</div>
												</div>
											</li>
											<li>
												<span className="number time">
													<i className="icon icon-time"></i>
												</span>
												<div className="content ml-3 flex-grow-1">
													<div className="d-flex align-items-center mr-2">
														<span className="font-14-rem color-white-gray">Tiempo Restante:</span>
													</div>
													<div className="mt-2 d-flex align-items-center justify-content-between">
														<div className="d-flex align-items-center">
															<ExField type="checkbox" name="CheckArt150" />
															<span className="font-14-rem color-white-gray">OK Ingreso GP e Inscripción.</span>
														</div>
														<div className="d-flex align-items-center">
															<span className="font-14-rem color-white-gray mr-3">
																<em>Ingresa el Comprobante.</em>
															</span>
															<ExField
																type="file"
																name="PhysicalMask"
																placeholder="Examinar..."
															// style={{width:"12em", height:"2.2em"}}
															/>
														</div>
													</div>
												</div>
											</li>
										</ol>
									</div>
									<div className="mt-3 d-flex justify-content-end">
										<Button>{step == 6 ? "Guardar y Comenzar Repertorio" : "Guardar"}</Button>
										<Button className="m-btn-white">Cancelar</Button>
									</div>
								</div>
							</>
						)}
					</BoxContent>
				</Box>
			)}
		</ExForm>
	);
}

Notary.propTypes = {
	// promesa: PropTypes.object,
};

export default Notary;
